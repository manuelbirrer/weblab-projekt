export interface LoginResponse {
  message?: string;
  jwt?: {
    access_token: string;
    expires_at: string;
  }
}
