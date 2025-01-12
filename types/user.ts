//user
export interface User {
  userid: number;
  email: string;
  nama: string;
  telepon: string;
  password: string;
  created_at: Date | undefined;
}
