export default interface IRawSession {
  id: string;

  access_token: string;

  refresh_token?: string;

  user_id: string;

  created_at: string | Date;

  expires_at?: string | Date;
}
