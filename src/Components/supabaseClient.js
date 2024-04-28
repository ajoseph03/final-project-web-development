import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gnlyqzwwymkcoiiicssb.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubHlxend3eW1rY29paWljc3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzQ0NDEsImV4cCI6MjAyOTY1MDQ0MX0.k-WXITXA1t6fA11OJuRPyD820nbI1lQShikaD8K0VkM'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
