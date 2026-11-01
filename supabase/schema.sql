-- ====================================================================
-- NAVIRA — SUPABASE DATABASE SCHEMA & RBAC ARCHITECTURE
-- Study Area: Mohali & Chandigarh, Punjab / UT, India
-- ====================================================================

-- 1. Create User Roles Enum
CREATE TYPE user_role AS ENUM ('business_owner', 'developer', 'admin');

-- 2. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'business_owner',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Verified Businesses Table (Mohali & Chandigarh leads)
CREATE TABLE IF NOT EXISTS public.businesses (
  business_id TEXT PRIMARY KEY,
  business_name TEXT NOT NULL,
  city TEXT NOT NULL CHECK (city IN ('Chandigarh', 'Mohali')),
  locality TEXT NOT NULL,
  address TEXT NOT NULL,
  category TEXT NOT NULL,
  google_maps_url TEXT,
  rating NUMERIC(2, 1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5.0),
  review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
  phone TEXT,
  website_url TEXT,
  has_website BOOLEAN NOT NULL DEFAULT false,
  website_status TEXT NOT NULL DEFAULT 'Not Found' CHECK (website_status IN ('Found', 'Not Found', 'Unclear')),
  opportunity_score INTEGER DEFAULT 0 CHECK (opportunity_score >= 0 AND opportunity_score <= 10),
  recommendation TEXT,
  verification_notes TEXT,
  claimed_by_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Businesses
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses are viewable by authenticated users and visitors" 
  ON public.businesses FOR SELECT USING (true);

CREATE POLICY "Admins can insert and update businesses" 
  ON public.businesses FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 4. Developer Profiles Table
CREATE TABLE IF NOT EXISTS public.developers (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Full Stack Web Developer',
  location TEXT NOT NULL,
  city TEXT NOT NULL CHECK (city IN ('Chandigarh', 'Mohali', 'Remote')),
  experience_years INTEGER DEFAULT 1,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  hourly_rate TEXT,
  starting_package TEXT,
  completed_projects INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT true,
  is_available BOOLEAN DEFAULT true,
  bio TEXT,
  about_me TEXT,
  skills TEXT[] DEFAULT '{}',
  response_rate TEXT DEFAULT '1 hr response time',
  github_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Developers
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Developer profiles are viewable by everyone" 
  ON public.developers FOR SELECT USING (true);

CREATE POLICY "Developers can update their own profile" 
  ON public.developers FOR UPDATE USING (auth.uid() = id);

-- 5. Proposals Table (Two-sided matching)
CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT REFERENCES public.businesses(business_id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  developer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_scope TEXT NOT NULL,
  proposed_budget TEXT NOT NULL,
  estimated_delivery TEXT NOT NULL,
  pitch_summary TEXT NOT NULL,
  features_offered TEXT[] DEFAULT '{}',
  whatsapp_url TEXT,
  status TEXT DEFAULT 'Sent' CHECK (status IN ('Sent', 'In Discussion', 'Proposal Accepted', 'Declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Proposals
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view proposals they sent or received" 
  ON public.proposals FOR SELECT 
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = developer_id OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can create proposals" 
  ON public.proposals FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Participants can update proposal status" 
  ON public.proposals FOR UPDATE 
  USING (auth.uid() = sender_id OR auth.uid() = developer_id);

-- 6. Trigger to automatically create a profile when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'NAVIRA Member'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'business_owner'::user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

