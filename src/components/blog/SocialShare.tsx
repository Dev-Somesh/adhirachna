
import { useState, useEffect } from 'react';
import { X, Linkedin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface SocialShareProps {
  postTitle: string;
  slug?: string;
}

const SocialShare = ({ postTitle, slug }: SocialShareProps) => {
  const [shortUrl, setShortUrl] = useState('');
  
  // Get current URL for sharing
  useEffect(() => {
    const url = window.location.href;
    
    // Create a cleaner short URL for sharing
    const baseUrl = window.location.origin;
    const cleanSlug = slug || url.split('/').pop() || '';
    setShortUrl(`${baseUrl}/blog/${cleanSlug}`);
  }, [slug]);

  const handleShareLink = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "Link Copied",
      description: "The article URL has been copied to your clipboard",
    });
  };
  
  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shortUrl)}&title=${encodeURIComponent(postTitle)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };
  
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}&text=${encodeURIComponent(postTitle)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div>
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
          value={shortUrl} 
          readOnly 
          className="flex-grow bg-white p-2 rounded border text-sm text-adhirachna-darkblue" 
        />
      </div>
    </div>
  );
};

export default SocialShare;
