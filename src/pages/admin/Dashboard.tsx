import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Globe, 
  BarChart3,
  ExternalLink
} from "lucide-react";

const Dashboard = () => {
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
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-adhirachna-gray">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Team Members</CardTitle>
            <Users className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-adhirachna-gray">All departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Content</CardTitle>
            <FileText className="h-4 w-4 text-adhirachna-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-adhirachna-gray">Pages & Blog Posts</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto p-4">
          <div className="flex flex-col items-center space-y-2">
            <Globe className="h-6 w-6" />
            <span>Manage Website Content</span>
          </div>
        </Button>

        <Button variant="outline" className="h-auto p-4">
          <div className="flex flex-col items-center space-y-2">
            <FileText className="h-6 w-6" />
            <span>Blog Management</span>
            <ExternalLink className="h-4 w-4" />
          </div>
        </Button>

        <Button variant="outline" className="h-auto p-4">
          <div className="flex flex-col items-center space-y-2">
            <Users className="h-6 w-6" />
            <span>Team Management</span>
          </div>
        </Button>

        <Button variant="outline" className="h-auto p-4">
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
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm font-medium">Content Update</p>
                <p className="text-sm text-adhirachna-gray">Home page content was updated</p>
              </div>
              <span className="text-sm text-adhirachna-gray">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm font-medium">New Team Member</p>
                <p className="text-sm text-adhirachna-gray">John Doe joined the team</p>
              </div>
              <span className="text-sm text-adhirachna-gray">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
