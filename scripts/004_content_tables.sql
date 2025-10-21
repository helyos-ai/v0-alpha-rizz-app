-- Content Management Tables for Admin Panel
-- This allows editing Commandments, Library Tips, and Scenarios through the admin UI

CREATE TABLE IF NOT EXISTS commandments (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge TEXT NOT NULL,
  tips TEXT[] NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS library_tips (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('conversation', 'body-language', 'confidence', 'dating', 'style')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS practice_scenarios (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  context TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  icon TEXT NOT NULL,
  tips TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_library_tips_category ON library_tips(category);
CREATE INDEX IF NOT EXISTS idx_library_tips_difficulty ON library_tips(difficulty);
CREATE INDEX IF NOT EXISTS idx_scenarios_difficulty ON practice_scenarios(difficulty);
