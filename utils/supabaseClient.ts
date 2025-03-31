import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://ybknlgtsavwzbdsfdhfx.supabase.co",
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlia25sZ3RzYXZ3emJkc2ZkaGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMjcyMjQsImV4cCI6MjA1NTgwMzIyNH0.MK3BHbb0gwsh5uenZB5H_6wYKuToD9keXCwiCq9GlE4"
  );
}

export const supabase = createClient();
