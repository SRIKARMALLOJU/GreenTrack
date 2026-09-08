export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
}

export interface JwtUserPayload {
  sub: string;
  roles: string[];
  exp: number;
}
