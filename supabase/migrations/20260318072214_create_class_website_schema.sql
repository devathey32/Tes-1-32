/*
  # Class Website Database Schema

  ## Overview
  Creates a comprehensive database schema for a class website containing:
  - Class information (name, homeroom teacher, guidance counselor, classroom)
  - Daily schedule (subjects, teachers, time slots)
  - Piket/cleaning duty assignments

  ## New Tables

  ### `class_info`
  - `id` (uuid, primary key) - Unique identifier
  - `class_name` (text) - Name of the class (e.g., "12 IPA 1")
  - `homeroom_teacher` (text) - Homeroom teacher name
  - `guidance_counselor` (text) - Guidance counselor name
  - `classroom` (text) - Room number or location
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `schedules`
  - `id` (uuid, primary key) - Unique identifier
  - `day` (text) - Day of week (Senin, Selasa, Rabu, Kamis, Jumat)
  - `subject` (text) - Subject name
  - `teacher` (text) - Teacher name
  - `time_start` (time) - Start time
  - `time_end` (time) - End time
  - `order` (integer) - Order of classes (1st, 2nd, 3rd period, etc.)
  - `created_at` (timestamptz) - Creation timestamp

  ### `piket_duties`
  - `id` (uuid, primary key) - Unique identifier
  - `day` (text) - Day of week
  - `student_name` (text) - Student assigned to piket
  - `order` (integer) - Order in the list
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for all tables (class website is informational)
  - Restricted write access (can be extended for admin functionality later)
*/

CREATE TABLE IF NOT EXISTS class_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name text NOT NULL,
  homeroom_teacher text NOT NULL,
  guidance_counselor text NOT NULL,
  classroom text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL CHECK (day IN ('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat')),
  subject text NOT NULL,
  teacher text NOT NULL,
  time_start time NOT NULL,
  time_end time NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS piket_duties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL CHECK (day IN ('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat')),
  student_name text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE class_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE piket_duties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view class info"
  ON class_info FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view schedules"
  ON schedules FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view piket duties"
  ON piket_duties FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS schedules_day_order_idx ON schedules(day, "order");
CREATE INDEX IF NOT EXISTS piket_duties_day_order_idx ON piket_duties(day, "order");
