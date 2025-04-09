
import { useState, useEffect } from 'react';
import { Facebook, X, Linkedin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface SocialShareProps {
  postTitle: string;
}

const SocialShare = ({ postTitle }: SocialShareProps) => {
  const [pageUrl, setPageUrl] = useState('');
  
  // Get current URL for sharing
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleShareLink = () => {
    navigator.clipboard.writeText(pageUrl);
    toast({
      title: "Link Copied",
      description: "The article URL has been copied to your clipboard",
    });
  };
  
  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(postTitle)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };
  
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(postTitle)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className="mt-8 bg-adhirachna-light p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-adhirachna-darkblue mb-4">Share this article</h3>
      <div className="flex flex-wrap items-center gap-3">
        <Button 
          onClick={shareToLinkedIn} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-white hover:bg-[#0077b5] hover:text-white"
        >
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
        </Button>
        <Button 
          onClick={shareToTwitter} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-white hover:bg-black hover:text-white"
        >
          <X className="h-4 w-4" />
          <span>X (Twitter)</span>
        </Button>
        <Button 
          onClick={handleShareLink} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-white hover:bg-adhirachna-green hover:text-white"
        >
          <Share2 className="h-4 w-4" />
          <span>Copy Link</span>
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-adhirachna-gray">
        <input 
          type="text" 
          value={pageUrl} 
          readOnly 
          className="flex-grow bg-white p-2 rounded border text-sm text-adhirachna-darkblue" 
        />
      </div>
    </div>
  );
};

export default SocialShare;
