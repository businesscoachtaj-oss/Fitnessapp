-- CT Fitness — 52 Week Program Progress Tables
-- Run this in your Supabase SQL editor

-- 1. Program progress (current week, level, completed weeks)
create table if not exists program_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  current_week integer not null default 1,
  current_level text not null default 'beginner',
  completed_weeks jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- 2. Workout log (sets/reps/weight per exercise per week)
create table if not exists workout_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  exercise_name text not null,
  log_key text not null,      -- e.g. "beginner_12_0" (level_week_sessionIdx)
  set_index integer not null,
  reps text,
  weight text,
  rpe text,
  logged_at timestamptz not null default now(),
  unique(user_id, exercise_name, log_key, set_index)
);

-- Row Level Security
alter table program_progress enable row level security;
alter table workout_log enable row level security;

-- Users can only read/write their own rows
create policy "Users own their progress"
  on program_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users own their logs"
  on workout_log for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Index for fast lookups
create index if not exists workout_log_user_idx on workout_log(user_id, log_key);
create index if not exists program_progress_user_idx on program_progress(user_id);
