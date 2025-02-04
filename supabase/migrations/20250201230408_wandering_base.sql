/*
  # Add message field to waitlist_signups

  1. Changes
    - Add `message` column to `waitlist_signups` table for storing contact form messages
  
  2. Security
    - Existing RLS policies remain in place
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'waitlist_signups' AND column_name = 'message'
  ) THEN
    ALTER TABLE waitlist_signups ADD COLUMN message text;
  END IF;
END $$;