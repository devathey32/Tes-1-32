import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey) {
  const options = {};

  if (typeof window !== 'undefined') {
    options.auth = {
      persistSession: true,
      storageKey: 'class-website-auth',
      storage: window.localStorage
    };
  } else {
    options.auth = {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    };
  }

  supabase = createClient(supabaseUrl, supabaseKey, options);
}

export { supabase };

export async function getClassInfo() {
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('class_info')
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error fetching class info:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Exception in getClassInfo:', err);
    return null;
  }
}

export async function getSchedulesByDay(day) {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('day', day)
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching schedules:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Exception in getSchedulesByDay:', err);
    return [];
  }
}

export async function getAllSchedules() {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching all schedules:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Exception in getAllSchedules:', err);
    return [];
  }
}

export async function getPiketByDay(day) {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('piket_duties')
      .select('*')
      .eq('day', day)
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching piket:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Exception in getPiketByDay:', err);
    return [];
  }
}

export async function getAllPiket() {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('piket_duties')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching all piket:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Exception in getAllPiket:', err);
    return [];
  }
}
