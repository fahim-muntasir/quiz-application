import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wmchnwfxjskewyeiczmb.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtY2hud2Z4anNrZXd5ZWljem1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNjU2ODksImV4cCI6MTk4MTk0MTY4OX0.0rqX-XaMcWUKbi9w9QikJ78vAh1Xuzz7oWnCmEh1B7M";
export const supabase = createClient(supabaseUrl, supabaseKey);
