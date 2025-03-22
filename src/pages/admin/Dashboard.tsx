
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisits: 0,
    totalMessages: 0,
    newMessages: 0
  });

  // Simulate fetching dashboard data
  useEffect(() => {
    // In a real app, this would be an API call to the backend
    const fetchDashboardData = () => {
      // Simulate API response with mock data
      const mockData = {
        totalVisits: Math.floor(Math.random() * 10000),
        totalMessages: Math.floor(Math.random() * 100),
        newMessages: Math.floor(Math.random() * 20)
      };
      
      setStats(mockData);
    };
    
    fetchDashboardData();
    
    // Show welcome message
    toast({
      title: "Welcome back!",
      description: "You can manage your website content from here."
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-adhirachna-gray mb-2">Total Visits</h3>
          <p className="text-3xl font-bold text-adhirachna-darkblue">{stats.totalVisits.toLocaleString()}</p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-adhirachna-gray mb-2">Total Messages</h3>
          <p className="text-3xl font-bold text-adhirachna-darkblue">{stats.totalMessages}</p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-adhirachna-gray mb-2">New Messages</h3>
          <p className="text-3xl font-bold text-adhirachna-green">{stats.newMessages}</p>
        </div>
      </div>
      
      <div className="glass-card p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            className="btn-secondary"
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature is under development."
            })}
          >
            Update Website Content
          </button>
          <button 
            className="btn-secondary"
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature is under development."
            })}
          >
            Add New Team Member
          </button>
          <button 
            className="btn-secondary"
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature is under development."
            })}
          >
            View Website Analytics
          </button>
          <button 
            className="btn-secondary"
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature is under development."
            })}
          >
            Backup Website Data
          </button>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-adhirachna-darkblue">
              <span className="font-medium">Website content</span> was updated
            </p>
            <p className="text-sm text-adhirachna-gray">2 days ago</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-adhirachna-darkblue">
              <span className="font-medium">New project</span> was added to the portfolio
            </p>
            <p className="text-sm text-adhirachna-gray">5 days ago</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-adhirachna-darkblue">
              <span className="font-medium">Team member</span> profile was updated
            </p>
            <p className="text-sm text-adhirachna-gray">1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
