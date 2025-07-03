
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string | null;
  tags: string[] | null;
  views: number;
  published?: boolean;
}

export interface Category {
  name: string;
  count: number;
}
