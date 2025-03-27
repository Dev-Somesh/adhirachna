
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogSidebar from '@/components/BlogSidebar';
import { Calendar, User, Eye, Tag, ArrowLeft, Facebook, X, Linkedin, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { useInView } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Future of Sustainable Infrastructure',
    excerpt: 'Exploring innovative approaches to building eco-friendly and resilient infrastructure for our growing cities.',
    author: 'Rahul Sharma',
    date: '2023-06-15',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    tags: ['sustainability', 'innovation', 'infrastructure'],
    views: 1250,
    content: `
      <p>Sustainable infrastructure is becoming increasingly important as cities around the world continue to grow and expand. With climate change posing significant challenges, the need for eco-friendly and resilient infrastructure has never been greater.</p>

      <h2>The Challenge of Sustainability</h2>
      <p>Traditional infrastructure development has often prioritized cost and speed over environmental considerations. However, this approach is no longer viable in the face of climate change and resource scarcity. The construction industry accounts for a significant portion of global carbon emissions, making it a crucial area for sustainability improvements.</p>

      <p>Engineers and urban planners are now facing the challenge of designing infrastructure that not only meets the needs of growing populations but also minimizes environmental impact. This requires innovative thinking and the application of new technologies and methodologies.</p>

      <h2>Innovative Approaches</h2>
      <p>Several innovative approaches are being developed to address the sustainability challenge in infrastructure development:</p>
      
      <ul>
        <li><strong>Green Building Materials:</strong> The use of sustainable and recycled materials is becoming increasingly common in construction projects.</li>
        <li><strong>Renewable Energy Integration:</strong> Infrastructure projects are incorporating renewable energy sources such as solar panels and wind turbines.</li>
        <li><strong>Smart Technology:</strong> The integration of smart technology allows for more efficient resource use and management.</li>
        <li><strong>Nature-Based Solutions:</strong> Engineers are increasingly looking to nature for inspiration, utilizing natural processes and ecosystems in their designs.</li>
      </ul>

      <h2>Case Studies</h2>
      <p>Several cities around the world are leading the way in sustainable infrastructure development. For example, Copenhagen has set ambitious goals to become carbon-neutral by 2025 and is implementing a range of initiatives to achieve this target, including green roofs, bike lanes, and energy-efficient buildings.</p>

      <p>Similarly, Singapore's Gardens by the Bay demonstrates how urban development can be combined with nature conservation. The project features vertical gardens that help to reduce the urban heat island effect while providing a habitat for wildlife.</p>

      <h2>The Future of Infrastructure</h2>
      <p>The future of infrastructure development lies in a holistic approach that considers environmental, social, and economic factors. By embracing sustainability principles and innovative technologies, engineers can create infrastructure that not only serves its primary purpose but also contributes positively to the environment and society.</p>

      <p>The transition to sustainable infrastructure will require significant investment and collaboration between governments, industry, and communities. However, the long-term benefits in terms of reduced carbon emissions, improved resilience, and enhanced quality of life make it a worthwhile endeavor.</p>
    `,
  },
  // ... more blog posts
];

// Define categories
const categories = [
  { name: 'All', count: mockBlogPosts.length },
  { name: 'Sustainability', count: mockBlogPosts.filter(post => post.category === 'Sustainability').length },
  { name: 'Technology', count: mockBlogPosts.filter(post => post.category === 'Technology').length },
  { name: 'Project Management', count: mockBlogPosts.filter(post => post.category === 'Project Management').length },
  { name: 'Engineering', count: mockBlogPosts.filter(post => post.category === 'Engineering').length },
];

const BlogDetail = () => {
  const { ref, isInView } = useInView();
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    // Get current URL for sharing
    setPageUrl(window.location.href);
    
    // Simulate fetching post from API
    setLoading(true);
    const foundPost = mockBlogPosts.find(p => p.id === parseInt(id as string));
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      setPost(foundPost || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleShareLink = () => {
    navigator.clipboard.writeText(pageUrl);
    toast({
      title: "Link Copied",
      description: "The article URL has been copied to your clipboard",
    });
  };

  const shareToLinkedIn = () => {
    if (!post) return;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(post.title)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToTwitter = () => {
    if (!post) return;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 bg-adhirachna-light min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-adhirachna-green"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="pt-24 bg-adhirachna-light min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-adhirachna-darkblue">Blog Post Not Found</h2>
              <p className="mt-4 text-adhirachna-gray">The blog post you are looking for might have been removed or is temporarily unavailable.</p>
              <Link to="/blog" className="mt-6 inline-block btn-primary">Back to Blog</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-adhirachna-light min-h-screen" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div 
              className={`w-full lg:w-2/3 transition-opacity duration-500 ${
                isInView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Link to="/blog" className="inline-flex items-center text-adhirachna-blue hover:text-adhirachna-green mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="bg-white rounded-lg shadow-soft overflow-hidden">
                <div className="h-96 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-adhirachna-green/10 text-adhirachna-green rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-adhirachna-darkblue mb-4">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-adhirachna-gray mb-8">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>{post.views} views</span>
                    </div>
                  </div>
                  
                  <div className="prose prose-adhirachna max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
                  
                  <div className="flex flex-wrap items-center gap-4 border-t border-b border-gray-200 py-6">
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-adhirachna-gray" />
                      <span className="text-adhirachna-darkblue font-medium">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Link 
                          key={tag} 
                          to={`/blog?tag=${tag}`}
                          className="px-3 py-1 bg-adhirachna-light text-adhirachna-darkblue rounded-full text-sm hover:bg-adhirachna-green hover:text-white transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced Social Sharing Section */}
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
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              <BlogSidebar 
                categories={categories} 
                selectedCategory={'All'}
                setSelectedCategory={() => {}}
                recentPosts={mockBlogPosts.slice(0, 3)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
