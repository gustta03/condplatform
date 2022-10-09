import { api } from '../services/api/api';

const signIn = (token: string): void => {
  return localStorage.setItem('@user:admin', token);
};

const signOut = (): void => {
  return localStorage.removeItem('@user:admin');
};

const TokenValidate = async (): Promise<string> => {
  const token = localStorage.getItem('@user:admin');
  const req = await api.post('/auth/validate', { token });

  return req.data;
};

export { signIn, signOut, TokenValidate };
