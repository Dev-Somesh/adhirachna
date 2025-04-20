import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users,
  MessageSquare,
  Briefcase,
  BarChart2,
  ExternalLink,
  Loader2,
  AlertCircle
} from "lucide-react";
import { supabase } from '@/lib/supabase';
import contentfulClient from '@/lib/contentful';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DashboardStats {
  publishedBlogs: number;
  totalMessages: number;
  activeTeamMembers: number;
  completedProjects: number;
  websiteTraffic: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Verify session first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session) {
          navigate('/login');
          return;
        }

        // Initialize default stats
        const defaultStats: DashboardStats = {
          publishedBlogs: 0,
          totalMessages: 0,
          activeTeamMembers: 0,
          completedProjects: 0,
          websiteTraffic: 0,
          recentActivity: []
        };

        try {
          // Fetch blog posts from Contentful
          const blogResponse = await contentfulClient.getEntries({
            content_type: 'blogPost',
            limit: 1000,
            select: ['sys.id', 'sys.updatedAt'] as const
          });
          defaultStats.publishedBlogs = blogResponse.total;

          // Fetch projects from Contentful
          const projectsResponse = await contentfulClient.getEntries({
            content_type: 'project',
            limit: 1000,
            select: ['sys.id', 'sys.updatedAt'] as const
          });
          defaultStats.completedProjects = projectsResponse.total;

          // Fetch team members from Supabase
          const { count: teamCount, error: teamError } = await supabase
            .from('team_members')
            .select('*', { count: 'exact' });
          if (!teamError && teamCount !== null) {
            defaultStats.activeTeamMembers = teamCount;
          }

          // Fetch messages from Supabase
          const { count: messagesCount, error: messagesError } = await supabase
            .from('messages')
            .select('*', { count: 'exact' });
          if (!messagesError && messagesCount !== null) {
            defaultStats.totalMessages = messagesCount;
          }

          // Fetch website traffic from Supabase
          const { count: trafficCount, error: trafficError } = await supabase
            .from('website_traffic')
            .select('*', { count: 'exact' });
          if (!trafficError && trafficCount !== null) {
            defaultStats.websiteTraffic = trafficCount;
          }

          // Fetch recent activity from Supabase
          const { data: activityData, error: activityError } = await supabase
            .from('activity_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

          if (!activityError && activityData) {
            defaultStats.recentActivity = activityData;
          }

          setStats(defaultStats);
        } catch (dbError) {
          console.warn('Error fetching data:', dbError);
          setStats(defaultStats);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Set up real-time subscription for activity
    const activitySubscription = supabase
      .channel('activity_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activity_log' }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      activitySubscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-adhirachna-blue mx-auto mb-4" />
          <p className="text-adhirachna-gray">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full p-6">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-adhirachna-gray">
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.publishedBlogs}</div>
            <p className="text-xs text-adhirachna-gray">Total blog posts</p>
          </CardContent>
        </Card>

        {/* Messages Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Received</CardTitle>
            <MessageSquare className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMessages}</div>
            <p className="text-xs text-adhirachna-gray">Total messages</p>
          </CardContent>
        </Card>

        {/* Team Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeTeamMembers}</div>
            <p className="text-xs text-adhirachna-gray">Active members</p>
          </CardContent>
        </Card>

        {/* Projects Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completedProjects}</div>
            <p className="text-xs text-adhirachna-gray">Total projects</p>
          </CardContent>
        </Card>

        {/* Traffic Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Traffic</CardTitle>
            <BarChart2 className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.websiteTraffic}</div>
            <p className="text-xs text-adhirachna-gray">Total visitors</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 hover:bg-adhirachna-blue/10 transition-colors"
          onClick={() => navigate('/admin/blog')}
        >
          <div className="flex flex-col items-center space-y-2">
            <FileText className="h-6 w-6" />
            <span>Blog Management</span>
            <ExternalLink className="h-4 w-4" />
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto p-4 hover:bg-adhirachna-blue/10 transition-colors"
          onClick={() => navigate('/admin/team')}
        >
          <div className="flex flex-col items-center space-y-2">
            <Users className="h-6 w-6" />
            <span>Team Management</span>
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto p-4 hover:bg-adhirachna-blue/10 transition-colors"
          onClick={() => navigate('/admin/services')}
        >
          <div className="flex flex-col items-center space-y-2">
            <Briefcase className="h-6 w-6" />
            <span>Services Management</span>
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto p-4 hover:bg-adhirachna-blue/10 transition-colors"
          onClick={() => navigate('/admin/messages')}
        >
          <div className="flex flex-col items-center space-y-2">
            <MessageSquare className="h-6 w-6" />
            <span>Messages</span>
          </div>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.type}</p>
                  <p className="text-sm text-adhirachna-gray">{activity.description}</p>
                </div>
                <span className="text-sm text-adhirachna-gray">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
            {stats?.recentActivity.length === 0 && (
              <p className="text-sm text-adhirachna-gray text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
