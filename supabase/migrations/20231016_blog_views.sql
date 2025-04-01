
-- Create function to increment blog post views
CREATE OR REPLACE FUNCTION increment_blog_view(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
