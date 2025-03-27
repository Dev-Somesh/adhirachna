
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import BlogSidebar from '@/components/BlogSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useInView } from '@/components/ui/motion';

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
  },
  {
    id: 2,
    title: 'Structural Health Monitoring: Best Practices',
    excerpt: 'An in-depth look at the latest technologies and methodologies for monitoring structural integrity.',
    author: 'Priya Patel',
    date: '2023-07-22',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    tags: ['technology', 'monitoring', 'structures'],
    views: 980,
  },
  {
    id: 3,
    title: 'Managing Complex Engineering Projects',
    excerpt: 'Key strategies and tools for successful management of large-scale engineering initiatives.',
    author: 'Amit Kumar',
    date: '2023-08-10',
    category: 'Project Management',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    tags: ['project management', 'strategies', 'tools'],
    views: 1500,
  },
  {
    id: 4,
    title: 'The Role of AI in Modern Engineering',
    excerpt: 'How artificial intelligence is transforming the engineering landscape and creating new possibilities.',
    author: 'Neha Gupta',
    date: '2023-09-05',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    tags: ['technology', 'AI', 'innovation'],
    views: 2100,
  },
  {
    id: 5,
    title: 'Advancements in Structural Analysis',
    excerpt: 'Recent developments and innovations in structural analysis methodologies and software.',
    author: 'Vikram Singh',
    date: '2023-10-18',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    tags: ['engineering', 'analysis', 'software'],
    views: 870,
  },
];

// Define categories
const categories = [
  { name: 'All', count: mockBlogPosts.length },
  { name: 'Sustainability', count: mockBlogPosts.filter(post => post.category === 'Sustainability').length },
  { name: 'Technology', count: mockBlogPosts.filter(post => post.category === 'Technology').length },
  { name: 'Project Management', count: mockBlogPosts.filter(post => post.category === 'Project Management').length },
  { name: 'Engineering', count: mockBlogPosts.filter(post => post.category === 'Engineering').length },
];

const Blog = () => {
  const { ref, isInView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [filteredPosts, setFilteredPosts] = useState(mockBlogPosts);

  useEffect(() => {
    // Filter by search term and category
    let results = mockBlogPosts;
    
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'All') {
      results = results.filter(post => post.category === selectedCategory);
    }
    
    // Sort posts
    if (sortBy === 'recent') {
      results = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'popular') {
      results = [...results].sort((a, b) => b.views - a.views);
    }
    
    setFilteredPosts(results);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-adhirachna-light min-h-screen" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-adhirachna-darkblue mb-4">Our Blog</h1>
            <p className="text-xl text-adhirachna-gray max-w-3xl mx-auto">
              Stay updated with the latest insights, innovations, and developments in engineering and infrastructure.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-64">
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-adhirachna-gray" />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-adhirachna-darkblue">Sort by:</span>
                  <Button 
                    variant={sortBy === 'recent' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy('recent')}
                  >
                    Recent
                  </Button>
                  <Button 
                    variant={sortBy === 'popular' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy('popular')}
                  >
                    Most Visited
                  </Button>
                </div>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div 
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 ${
                    isInView ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-soft">
                  <h3 className="text-xl font-medium text-adhirachna-darkblue mb-2">No posts found</h3>
                  <p className="text-adhirachna-gray">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-1/3">
              <BlogSidebar 
                categories={categories} 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
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

export default Blog;
