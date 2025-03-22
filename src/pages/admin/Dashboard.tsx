
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useSiteContent } from "@/context/SiteContext";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { siteContent } = useSiteContent();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Show welcome message
    toast({
      title: "Welcome back!",
      description: "You can manage your website content from here."
    });
  }, []);

  // Sample data for website visits graph
  const visitData = [
    { name: 'Jan', visits: 2400 },
    { name: 'Feb', visits: 1398 },
    { name: 'Mar', visits: 9800 },
    { name: 'Apr', visits: 3908 },
    { name: 'May', visits: 4800 },
    { name: 'Jun', visits: 3800 },
    { name: 'Jul', visits: 4300 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-adhirachna-gray mb-2">Total Visits</h3>
          <p className="text-3xl font-bold text-adhirachna-darkblue">{siteContent.stats.totalVisits.toLocaleString()}</p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-adhirachna-gray mb-2">Total Messages</h3>
          <p className="text-3xl font-bold text-adhirachna-darkblue">{siteContent.stats.totalMessages}</p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-adhirachna-gray mb-2">New Messages</h3>
          <p className="text-3xl font-bold text-adhirachna-green">{siteContent.stats.newMessages}</p>
        </div>
      </div>
      
      <div className="glass-card p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Website Traffic</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visitData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#16a34a" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-card p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/admin/content')}
          >
            Update Website Content
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/admin/team')}
          >
            Manage Team Members
          </button>
          <button 
            className="btn-secondary"
            onClick={() => {
              // Preview the website in a new tab
              window.open('/', '_blank');
            }}
          >
            Preview Website
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/admin/messages')}
          >
            Check New Messages
          </button>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {siteContent.stats.recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-adhirachna-darkblue">
                <span className="font-medium">{activity.action}</span> {activity.description}
              </p>
              <p className="text-sm text-adhirachna-gray">{activity.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
