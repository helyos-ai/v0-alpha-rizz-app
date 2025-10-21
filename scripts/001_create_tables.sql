-- Gorizzla Rizz Coach Database Schema
-- Creates all necessary tables for the app

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  rizz_score integer default 0,
  level text default 'Beginner',
  current_streak integer default 0,
  last_check_in timestamp with time zone,
  total_minutes_used integer default 0,
  minutes_remaining integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Sessions table (tracks all coaching sessions)
create table if not exists public.sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  session_type text not null, -- 'coaching', 'scenario', 'commandment'
  mode text, -- 'pre-date', 'approach', 'debrief', 'confidence'
  duration_minutes integer default 0,
  topics text[], -- array of topics discussed
  sentiment text, -- 'positive', 'neutral', 'negative'
  notes text,
  created_at timestamp with time zone default now()
);

-- Achievements table (badges and milestones)
create table if not exists public.achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  achievement_type text not null, -- 'first_session', '10_day_streak', 'commandment_master', etc.
  title text not null,
  description text,
  icon text,
  earned_at timestamp with time zone default now()
);

-- Goals table (weekly goals)
create table if not exists public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  goal_text text not null,
  target_date date,
  completed boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Commandments Progress table
create table if not exists public.commandments_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  commandment_id integer not null, -- 1-10
  completion_percentage integer default 0,
  last_practiced timestamp with time zone,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, commandment_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.achievements enable row level security;
alter table public.goals enable row level security;
alter table public.commandments_progress enable row level security;

-- RLS Policies for profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- RLS Policies for sessions
create policy "Users can view own sessions"
  on public.sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on public.sessions for insert
  with check (auth.uid() = user_id);

-- RLS Policies for achievements
create policy "Users can view own achievements"
  on public.achievements for select
  using (auth.uid() = user_id);

create policy "Users can insert own achievements"
  on public.achievements for insert
  with check (auth.uid() = user_id);

-- RLS Policies for goals
create policy "Users can view own goals"
  on public.goals for select
  using (auth.uid() = user_id);

create policy "Users can insert own goals"
  on public.goals for insert
  with check (auth.uid() = user_id);

create policy "Users can update own goals"
  on public.goals for update
  using (auth.uid() = user_id);

create policy "Users can delete own goals"
  on public.goals for delete
  using (auth.uid() = user_id);

-- RLS Policies for commandments_progress
create policy "Users can view own commandments progress"
  on public.commandments_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own commandments progress"
  on public.commandments_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own commandments progress"
  on public.commandments_progress for update
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index if not exists sessions_user_id_idx on public.sessions(user_id);
create index if not exists sessions_created_at_idx on public.sessions(created_at desc);
create index if not exists achievements_user_id_idx on public.achievements(user_id);
create index if not exists goals_user_id_idx on public.goals(user_id);
create index if not exists commandments_progress_user_id_idx on public.commandments_progress(user_id);
