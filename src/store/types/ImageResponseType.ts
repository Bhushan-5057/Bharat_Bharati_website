export interface ApiImageResponse {
  id: number | string;
  title?: string;
  file_name?: string;
  data?: unknown;
  mime_type?: string;
}

 export interface NormalizedImage {
  id: number | string;
  title?: string;
  url: string;
}
