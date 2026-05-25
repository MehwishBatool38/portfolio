import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://ahegdcebnoshclkkudyy.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZWdkY2Vibm9zaGNsa2t1ZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDI3NDgsImV4cCI6MjA5NDQxODc0OH0.ZZg-qg1uTOmgQ5fdIDVAvKXfeF4p2bj2SgDQlBNMiU8";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables. Set SUPABASE_URL and SUPABASE_KEY or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const projectNames = ["CGPA Calculator", "Task Manager", "Mini Calculator"];

async function run() {
  console.log("Looking up miscategorized projects...");

  const filterExpr = projectNames.map((name) => `title.ilike.%${name}%`).join(",");
  const { data: rows, error: fetchError } = await supabase
    .from("web_projects")
    .select("*")
    .or(filterExpr);

  if (fetchError) {
    console.error("Failed to fetch web_projects:", fetchError);
    process.exit(1);
  }

  if (!rows || rows.length === 0) {
    console.log("No matching web_projects found. Nothing to migrate.");
    return;
  }

  console.log(`Found ${rows.length} project(s) to migrate:`);
  rows.forEach((row) => console.log(` - ${row.title} (id=${row.id})`));

  for (const row of rows) {
    const { id, created_at, updated_at, ...projectData } = row;
    try {
      const { data: inserted, error: insertError } = await supabase
        .from("app_projects")
        .insert([projectData])
        .select()
        .single();

      if (insertError) {
        console.error(`Failed to insert ${row.title}:`, insertError);
        continue;
      }

      const { error: deleteError } = await supabase
        .from("web_projects")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error(`Failed to delete old web_projects row for ${row.title}:`, deleteError);
      } else {
        console.log(`Migrated ${row.title} to app_projects (new id=${inserted.id}).`);
      }
    } catch (err) {
      console.error(`Unexpected error migrating ${row.title}:`, err);
    }
  }

  console.log("Migration complete.");
}

run().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
