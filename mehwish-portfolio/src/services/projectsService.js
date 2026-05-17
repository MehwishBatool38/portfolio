import { supabase } from "./supabase";

function tableFor(type) {
  return type === "app" ? "app_projects" : "web_projects";
}

function normalizeProjectPayload(project) {
  const { type, id, created_at, updated_at, ...projectData } = project;

  if (typeof projectData.screenshots === "string") {
    projectData.screenshots = projectData.screenshots
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(projectData.screenshots)) {
    projectData.screenshots = [];
  }

  return Object.fromEntries(
    Object.entries(projectData).filter(([, value]) => value !== undefined)
  );
}

export async function getProjects(type) {
  const table = tableFor(type);
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("year", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addProject(project) {
  const table = tableFor(project.type);
  const projectData = normalizeProjectPayload(project);
  const { data, error } = await supabase
    .from(table)
    .insert([projectData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(id, project) {
  const table = tableFor(project.type);
  const projectData = normalizeProjectPayload(project);
  const { data, error } = await supabase
    .from(table)
    .update(projectData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id, type) {
  const table = tableFor(type);
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}
