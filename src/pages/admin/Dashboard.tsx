import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Globe, 
  BarChart3,
  ExternalLink,
  Loader2
} from "lucide-react";
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface DashboardStats {
  totalVisitors: number;
  activeTeamMembers: number;
  publishedContent: number;
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all stats in parallel
        const [
          { count: visitorsCount },
          { count: teamCount },
          { count: contentCount },
          { data: activityData }
        ] = await Promise.all([
          supabase.from('visitors').select('*', { count: 'exact' }),
          supabase.from('team_members').select('*', { count: 'exact' }),
          supabase.from('content').select('*', { count: 'exact' }),
          supabase.from('activity_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5)
        ]);

        setStats({
          totalVisitors: visitorsCount || 0,
          activeTeamMembers: teamCount || 0,
          publishedContent: contentCount || 0,
          recentActivity: activityData || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-adhirachna-blue" />
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
        {/* Quick Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <BarChart3 className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-adhirachna-gray">Real-time tracking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Team Members</CardTitle>
            <Users className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeTeamMembers}</div>
            <p className="text-xs text-adhirachna-gray">All departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Content</CardTitle>
            <FileText className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.publishedContent}</div>
            <p className="text-xs text-adhirachna-gray">Pages & Blog Posts</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 hover:bg-adhirachna-blue/10 transition-colors"
          onClick={() => navigate('/admin/content')}
        >
          <div className="flex flex-col items-center space-y-2">
            <Globe className="h-6 w-6" />
            <span>Manage Website Content</span>
          </div>
        </Button>

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
          onClick={() => navigate('/admin/settings')}
        >
          <div className="flex flex-col items-center space-y-2">
            <Settings className="h-6 w-6" />
            <span>System Settings</span>
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
