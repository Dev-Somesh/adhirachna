
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContentFormProps {
  onSubmit: (data: any) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" placeholder="Enter title" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Enter description" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" placeholder="Enter content" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

const ContentManagement = () => {
  const handleContentSubmit = (data: any) => {
    console.log('Form Data Submitted:', data);
    // Handle the form submission logic here (e.g., API call)
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Content</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentForm onSubmit={handleContentSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
