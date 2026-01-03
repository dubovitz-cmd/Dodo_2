/*
  # Create Counter Table

  1. New Tables
    - `counter`
      - `id` (uuid, primary key) - Unique identifier
      - `value` (integer) - Current counter value
      - `updated_at` (timestamp) - Last update time

  2. Security
    - Enable RLS for public read access (everyone can view)
    - Add policy for public SELECT access
    - Counter is read-only for public (updates handled via Edge Function later)

  3. Notes
    - Single row table with id='counter' to store the global counter value
    - Real-time subscriptions will be used for live updates
*/

CREATE TABLE IF NOT EXISTS counter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE counter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view counter"
  ON counter
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO counter (value) VALUES (0) ON CONFLICT DO NOTHING;
