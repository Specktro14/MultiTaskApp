import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log("filename", __filename);
const __dirname = path.dirname(__filename);
console.log("dirname", __dirname);
const envPath = path.resolve(__dirname, "../.env.local");
console.log("envPath", envPath);

dotenv.config({ path: envPath });

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY:",
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
  );
}
