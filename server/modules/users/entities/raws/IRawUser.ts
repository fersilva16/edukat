export default interface IRawUser {
  id: string;

  firstname: string;

  lastname: string;

  email: string;

  password: string;

  type_id: string;

  created_at: string;

  updated_at?: string;
}
