export default interface IRawPartialUser {
  id: string;

  firstname?: string;

  lastname?: string;

  email: string;

  type_id: string;

  created_at: string | Date;

  updated_at: string | Date;
}
