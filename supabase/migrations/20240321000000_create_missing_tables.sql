-- Create team_members table
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo text,
  linkedin text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create activity_log table
create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  activity text not null,
  details jsonb,
  created_at timestamp with time zone default now()
);

-- Create content table
create table if not exists content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  body text not null,
  type text not null,
  metadata jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create visitors table
create table if not exists visitors (
  id uuid primary key default gen_random_uuid(),
  ip_address text,
  user_agent text,
  path text,
  referrer text,
  created_at timestamp with time zone default now()
);

-- Create user_roles table
create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) unique,
  role text not null check (role in ('admin', 'editor', 'viewer')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create RLS policies
alter table team_members enable row level security;
alter table activity_log enable row level security;
alter table content enable row level security;
alter table visitors enable row level security;
alter table user_roles enable row level security;

-- Team members policies
create policy "Team members are viewable by everyone"
  on team_members for select
  using (true);

create policy "Team members are editable by admins"
  on team_members for all
  using (auth.uid() in (select user_id from user_roles where role = 'admin'));

-- Activity log policies
create policy "Activity log is viewable by admins"
  on activity_log for select
  using (auth.uid() in (select user_id from user_roles where role = 'admin'));

create policy "Activity log is insertable by authenticated users"
  on activity_log for insert
  with check (auth.uid() is not null);

-- Content policies
create policy "Content is viewable by everyone"
  on content for select
  using (true);

create policy "Content is editable by admins and editors"
  on content for all
  using (auth.uid() in (select user_id from user_roles where role in ('admin', 'editor')));

-- Visitors policies
create policy "Visitors are viewable by admins"
  on visitors for select
  using (auth.uid() in (select user_id from user_roles where role = 'admin'));

create policy "Visitors are insertable by everyone"
  on visitors for insert
  with check (true);

-- User roles policies
create policy "User roles are viewable by admins"
  on user_roles for select
  using (auth.uid() in (select user_id from user_roles where role = 'admin'));

create policy "User roles are editable by admins"
  on user_roles for all
  using (auth.uid() in (select user_id from user_roles where role = 'admin')); 