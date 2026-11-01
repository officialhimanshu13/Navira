export type UserRole = 'admin' | 'business_owner' | 'developer' | 'visitor';

export type AuthProvider = 'google' | 'email' | 'master_key';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  authMethod: AuthProvider;
  token?: string;
  expiresAt?: number;
}

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export interface AdminAuthConfig {
  authorizedEmails: string[];
  tokenExpiryHours: number;
}

