-- Trigger: sync new Supabase auth users into the public "User" table.
-- Run this once in Supabase Dashboard → SQL Editor.
--
-- The trigger fires after every INSERT on auth.users (email, Google OAuth, etc.)
-- and creates the matching public "User" row using the same UUID as the primary key.
-- ON CONFLICT DO NOTHING makes it idempotent (safe to re-run or replay).

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public."User" (id, email, "fullName", "createdAt")
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop the trigger first in case this script is re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();
