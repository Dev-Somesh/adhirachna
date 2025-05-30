
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string | null;
  category: string;
  image: string | null;
  tags: string[] | null;
  views: number | null;
  published: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Category {
  name: string;
  count: number;
}
