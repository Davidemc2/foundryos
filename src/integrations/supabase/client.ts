// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jxvlovpsrsbxpxqvebii.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4dmxvdnBzcnNieHB4cXZlYmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjIyOTYsImV4cCI6MjA1NzYzODI5Nn0.eiso7gFw2BKnjKMqR_R38ZnsXDSbWhhvts3YsenT-pg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);