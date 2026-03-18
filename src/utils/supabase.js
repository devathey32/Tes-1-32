import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getClassInfo() {
  const { data, error } = await supabase
    .from('class_info')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getSchedulesByDay(day) {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('day', day)
    .order('order', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getAllSchedules() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .order('order', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getPiketByDay(day) {
  const { data, error } = await supabase
    .from('piket_duties')
    .select('*')
    .eq('day', day)
    .order('order', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getAllPiket() {
  const { data, error } = await supabase
    .from('piket_duties')
    .select('*')
    .order('order', { ascending: true });

  if (error) throw error;
  return data;
}
