// Creating the project types
export interface Project {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  imageUrl: string;
  techStack: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  message: string;
  project: Project;
}

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
}
