
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Eye, Mail, Trash, Check } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
};

const Messages = () => {
  // Mock data for messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "Hello, I'm interested in your architectural services for my new commercial building project. Could you provide more information about your process and pricing?",
      date: "2023-10-15T14:30:00",
      read: true
    },
    {
      id: "2",
      name: "Sara Johnson",
      email: "sara@example.com",
      subject: "Consultation Request",
      message: "I'm looking for a structural engineering consultation for a renovation project. When would be a good time to discuss this?",
      date: "2023-10-20T09:45:00",
      read: false
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      subject: "Partnership Opportunity",
      message: "Our construction firm is interested in exploring partnership opportunities with Adhirachna Engineering. Please let me know if we can schedule a call to discuss potential collaboration.",
      date: "2023-10-22T16:15:00",
      read: false
    }
  ]);
  
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
    
    // If the selected message is being marked as read, update it
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, read: true });
    }
    
    toast({
      title: "Marked as Read",
      description: "Message has been marked as read."
    });
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter(msg => msg.id !== id));
      
      // If the deleted message is currently selected, clear the selection
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      
      toast({
        title: "Message Deleted",
        description: "The message has been deleted successfully."
      });
    }
  };
  
  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if it's unread
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Messages</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="glass-card overflow-hidden">
            <div className="p-4 bg-adhirachna-darkblue text-white">
              <h3 className="font-medium">Inbox</h3>
            </div>
            
            <div className="divide-y">
              {messages.length > 0 ? (
                messages.map(message => (
                  <div 
                    key={message.id}
                    className={`p-4 cursor-pointer hover:bg-adhirachna-lightgray transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-adhirachna-lightgray' : ''
                    } ${
                      !message.read ? 'font-medium' : ''
                    }`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-adhirachna-darkblue truncate max-w-[200px]">
                        {!message.read && (
                          <span className="inline-block w-2 h-2 bg-adhirachna-blue rounded-full mr-2"></span>
                        )}
                        {message.name}
                      </h4>
                      <span className="text-xs text-adhirachna-gray">
                        {formatDate(message.date).split(',')[0]}
                      </span>
                    </div>
                    <p className="text-sm text-adhirachna-gray font-normal truncate">
                      {message.subject}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-adhirachna-gray">
                  No messages found
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:w-2/3">
          {selectedMessage ? (
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-adhirachna-darkblue">
                    {selectedMessage.subject}
                  </h3>
                  <p className="text-adhirachna-gray">
                    From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                  </p>
                  <p className="text-sm text-adhirachna-gray">
                    {formatDate(selectedMessage.date)}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  {!selectedMessage.read && (
                    <button
                      className="p-2 text-adhirachna-gray hover:text-adhirachna-blue transition-colors"
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      title="Mark as read"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    className="p-2 text-adhirachna-gray hover:text-adhirachna-blue transition-colors"
                    onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                    title="Reply"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-adhirachna-gray hover:text-red-500 transition-colors"
                    onClick={() => handleDelete(selectedMessage.id)}
                    title="Delete"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <p className="whitespace-pre-line">{selectedMessage.message}</p>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
              <Eye className="h-16 w-16 text-adhirachna-gray/30 mb-4" />
              <p className="text-adhirachna-gray">Select a message to view its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
