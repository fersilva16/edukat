export default interface IRawUser {
  id: string;

  firstname: string;

  lastname: string;

  email: string;

  password: string;

  type_id: string;

  created_at: string | Date;

  updated_at: string | Date;
}
