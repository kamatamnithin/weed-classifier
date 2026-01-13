import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client for the frontend
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Server API base URL
export const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5c49bc22`;
