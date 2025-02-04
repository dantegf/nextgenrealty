/*
  # Create waitlist signups table

  1. New Tables
    - `waitlist_signups`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required, unique)
      - `desired_plan` (text, required)
      - `created_at` (timestamp)
      - `marketing_consent` (boolean)

  2. Security
    - Enable RLS on `waitlist_signups` table
    - Add policy for inserting new signups
    - Add policy for admin to read all signups
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  desired_plan text NOT NULL,
  created_at timestamptz DEFAULT now(),
  marketing_consent boolean DEFAULT false
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new signups
CREATE POLICY "Anyone can sign up for waitlist"
  ON waitlist_signups
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated admins can view signups
CREATE POLICY "Admins can view waitlist signups"
  ON waitlist_signups
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'admin');