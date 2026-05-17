import { supabase } from "./supabase";

export async function getProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();
  if (error) return null;
  return data;
}

function cleanProfile(profile) {
  const { created_at, updated_at, ...profileData } = profile;
  return Object.fromEntries(
    Object.entries({ ...profileData, id: 1 }).filter(([, value]) => value !== undefined)
  );
}

export async function updateProfile(profile) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(cleanProfile(profile))
    .select()
    .single();
  if (error) throw error;
  return data;
}
