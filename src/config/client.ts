import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseUrl = url;
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
