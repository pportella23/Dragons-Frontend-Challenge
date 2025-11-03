export interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
