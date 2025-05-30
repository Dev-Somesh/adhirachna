
import { Share2, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  title?: string;
  postTitle?: string;
  url?: string;
}

export const SocialShare = ({ title, postTitle, url = window.location.href }: SocialShareProps) => {
  const shareTitle = title || postTitle || 'Check out this post';
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedUrl = encodeURIComponent(url);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      '_blank'
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy URL to clipboard', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-adhirachna-gray">Share:</span>
      <Button variant="outline" size="sm" onClick={shareOnTwitter}>
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={shareOnLinkedIn}>
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SocialShare;
