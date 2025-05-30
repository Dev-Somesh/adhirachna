
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      title: 'CEO',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      avatarUrl: 'https://avatars.dicebear.com/api/male/john.svg',
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'CTO',
      email: 'jane.smith@example.com',
      phone: '098-765-4321',
      avatarUrl: 'https://avatars.dicebear.com/api/female/jane.svg',
    },
  ]);

  const handleEdit = (id: string) => {
    alert(`Edit team member with id ${id}`);
  };

  const handleDelete = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Team Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <Card key={member.id}>
            <CardHeader>
              <Avatar className="w-20 h-20 rounded-full mx-auto">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center mt-3">{member.name}</CardTitle>
              <CardDescription className="text-center">{member.title}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{member.phone}</span>
              </div>
              <div className="flex justify-center space-x-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(member.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
