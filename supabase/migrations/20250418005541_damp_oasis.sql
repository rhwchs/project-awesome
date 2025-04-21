/*
  # Initial schema setup for Links Archive

  1. New Tables
    - `links`
      - `id` (uuid, primary key)
      - `url` (text, required)
      - `name` (text, required)
      - `color` (text, required)
      - `requires_account` (boolean)
      - `order` (integer)
      - `created_at` (timestamp)

    - `website_of_day`
      - `id` (uuid, primary key)
      - `link_id` (uuid, references links)
      - `date` (date)
      - `is_manual_override` (boolean)
      - `created_at` (timestamp)

    - `admin_messages`
      - `id` (uuid, primary key)
      - `text` (text)
      - `color` (text)
      - `is_visible` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    - Allow public read access to links and website of day
*/

-- Create links table
CREATE TABLE links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  name text NOT NULL,
  color text NOT NULL DEFAULT '#2563eb',
  requires_account boolean NOT NULL DEFAULT false,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create website_of_day table
CREATE TABLE website_of_day (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES links(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  is_manual_override boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create admin_messages table
CREATE TABLE admin_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text,
  color text NOT NULL DEFAULT '#000000',
  is_visible boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_of_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_messages ENABLE ROW LEVEL SECURITY;

-- Policies for links
CREATE POLICY "Allow public read access to links" 
  ON links FOR SELECT TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage links" 
  ON links FOR ALL TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Policies for website_of_day
CREATE POLICY "Allow public read access to website of day" 
  ON website_of_day FOR SELECT TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage website of day" 
  ON website_of_day FOR ALL TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Policies for admin_messages
CREATE POLICY "Allow public read access to admin messages" 
  ON admin_messages FOR SELECT TO public 
  USING (true);

CREATE POLICY "Allow authenticated users to manage admin messages" 
  ON admin_messages FOR ALL TO authenticated 
  USING (true) 
  WITH CHECK (true);