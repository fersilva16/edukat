export default interface IRawSession {
  id: string;

  token: string;

  user_id: string;

  created_at: string;

  expires_at?: string;
}
