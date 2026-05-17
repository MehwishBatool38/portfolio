import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ahegdcebnoshclkkudyy.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZWdkY2Vibm9zaGNsa2t1ZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDI3NDgsImV4cCI6MjA5NDQxODc0OH0.ZZg-qg1uTOmgQ5fdIDVAvKXfeF4p2bj2SgDQlBNMiU8";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required.");
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

const STORAGE_BUCKET = "portfolio-images";

function safeFileName(file, folder) {
  const cleanFolder = (folder || "uploads").replace(/^\/+|\/+$/g, "");
  const parts = file.name.split(".");
  const fileExt = parts.length > 1 ? parts.pop().toLowerCase() : "file";
  const baseName = parts.join(".")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "upload";

  return `${cleanFolder}/${baseName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
}

export async function uploadFile(file, folder = "uploads", options = {}) {
  if (!file) return null;

  const { accept = [], maxSizeMb = 15 } = options;
  const allowed = Array.isArray(accept) ? accept : [accept];
  const matchesType = allowed.length === 0 || allowed.some((type) => {
    if (!type) return false;
    if (type.endsWith("/*")) return file.type.startsWith(type.slice(0, -1));
    return file.type === type;
  });

  if (!matchesType) {
    throw new Error(`Please upload a valid ${allowed.join(" or ")} file.`);
  }

  if (file.size > maxSizeMb * 1024 * 1024) {
    throw new Error(`File is too large. Maximum size is ${maxSizeMb}MB.`);
  }

  const fileName = safeFileName(file, folder);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || "application/octet-stream",
    });

  if (error) {
    console.error("Upload error details:", error);
    if (error.message === "The resource was not found") {
      throw new Error(`Storage bucket "${STORAGE_BUCKET}" not found. Please create it as a public bucket in Supabase.`);
    }
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

/**
 * Upload an image to Supabase Storage and return its public URL
 * @param {File} file 
 * @param {string} folder optional folder name
 * @returns {Promise<string>} public URL of the uploaded image
 */
export async function uploadImage(file, folder = "uploads") {
  return uploadFile(file, folder, { accept: ["image/*"], maxSizeMb: 8 });
}

export async function uploadPdf(file, folder = "cvs") {
  return uploadFile(file, folder, { accept: ["application/pdf"], maxSizeMb: 12 });
}
