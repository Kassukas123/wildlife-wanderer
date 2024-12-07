import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || "https://kjzlisnzgumyvkrlfvwk.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqemxpc256Z3VteXZrcmxmdndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyODc3NTIsImV4cCI6MjA0ODg2Mzc1Mn0.844Q9Kqu0ZlBkCW6qTsiigp_MNYvzLwko3CAmVbcZeU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
