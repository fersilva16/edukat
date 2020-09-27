export default interface IRawSession {
  id: string;

  token: string;

  user_id: string;

  created_at: string | Date;

  expires_at?: string | Date;
}
