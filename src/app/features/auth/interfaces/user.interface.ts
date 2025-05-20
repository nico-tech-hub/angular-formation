export interface User {
  id: string;
  email: string;
  nom: string;
  role: 'admin' | 'utilisateur';
}
