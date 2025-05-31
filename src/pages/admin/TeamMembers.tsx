import { useState } from "react";
import { PlusCircle, Pencil, Trash, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useSiteContent, TeamMember, MemberRole } from "@/context/SiteContext";
import { Link } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define labels for roles
const roleLabels: Record<MemberRole, string> = {
  master_admin: "Master Admin",
  admin: "Admin",
  manager: "Manager",
  team_member: "Team Member"
};

const TeamMembers = () => {
  const { siteContent, updateTeamMember, addTeamMember, removeTeamMember } = useSiteContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const handleEdit = (member: TeamMember) => {
    setEditingMember({
      ...member,
      role: member.role || "team_member",
      showOnWebsite: member.showOnWebsite !== false // default to true
    });
    setIsEditing(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      removeTeamMember(id);
      toast({
        title: "Team Member Deleted",
        description: "The team member has been removed successfully."
      });
    }
  };
  
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingMember) return;
    
    if (editingMember.id) {
      // Update existing member
      updateTeamMember(editingMember);
      toast({
        title: "Team Member Updated",
        description: "The team member details have been updated successfully. Changes will be visible on the website."
      });
    } else {
      // Add new member
      const { name, position, image, bio, role, showOnWebsite } = editingMember;
      addTeamMember({ 
        name, 
        position, 
        image, 
        bio, 
        role, 
        showOnWebsite
      });
      toast({
        title: "Team Member Added",
        description: "A new team member has been added successfully. They will now appear on the website."
      });
    }
    
    setIsEditing(false);
    setEditingMember(null);
  };
  
  const handleAddNew = () => {
    setEditingMember({
      id: "",
      name: "",
      position: "",
      image: "https://randomuser.me/api/portraits/lego/1.jpg", // Default image
      bio: "",
      role: "team_member",
      showOnWebsite: true
    });
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditingMember(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <div className="flex space-x-4">
          <Link 
            to="/about" 
            target="_blank"
            className="btn-secondary flex items-center"
          >
            <Eye className="mr-2 h-5 w-5" />
            Preview Team Page
          </Link>
          <button 
            className="btn-primary flex items-center"
            onClick={handleAddNew}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Member
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-6">
            {editingMember?.id ? "Edit Team Member" : "Add New Team Member"}
          </h3>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-adhirachna-darkblue mb-2">Name</label>
                <input
                  type="text"
                  value={editingMember?.name || ""}
                  onChange={e => setEditingMember({...editingMember!, name: e.target.value})}
                  className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-adhirachna-darkblue mb-2">Position</label>
                <input
                  type="text"
                  value={editingMember?.position || ""}
                  onChange={e => setEditingMember({...editingMember!, position: e.target.value})}
                  className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-adhirachna-darkblue mb-2">Image URL</label>
              <input
                type="text"
                value={editingMember?.image || ""}
                onChange={e => setEditingMember({...editingMember!, image: e.target.value})}
                className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                required
              />
              <p className="text-sm text-adhirachna-gray mt-1">
                Enter a URL for the team member's profile image
              </p>
            </div>
            
            <div>
              <label className="block text-adhirachna-darkblue mb-2">Bio</label>
              <textarea
                value={editingMember?.bio || ""}
                onChange={e => setEditingMember({...editingMember!, bio: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-adhirachna-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-adhirachna-blue"
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-adhirachna-darkblue mb-2">Role</label>
                <Select 
                  value={editingMember?.role || "team_member"}
                  onValueChange={(value) => setEditingMember({...editingMember!, role: value as MemberRole})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={editingMember?.showOnWebsite !== false}
                    onChange={e => setEditingMember({...editingMember!, showOnWebsite: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-adhirachna-blue"></div>
                  <span className="ml-3 text-adhirachna-darkblue">Show on Website</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-adhirachna-gray text-adhirachna-gray rounded hover:bg-adhirachna-lightgray transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.teamMembers.map(member => (
            <div key={member.id} className="glass-card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-adhirachna-darkblue">{member.name}</h3>
                  <p className="text-adhirachna-blue">{member.position}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-adhirachna-light text-adhirachna-darkblue px-2 py-0.5 rounded">
                      {member.role ? roleLabels[member.role as MemberRole] : "Team Member"}
                    </span>
                    {member.showOnWebsite !== false && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">
                        Visible
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-adhirachna-gray mb-4">{member.bio}</p>
              
              <div className="flex justify-end space-x-2">
                <button
                  className="p-2 text-adhirachna-gray hover:text-adhirachna-blue transition-colors"
                  onClick={() => handleEdit(member)}
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  className="p-2 text-adhirachna-gray hover:text-red-500 transition-colors"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
