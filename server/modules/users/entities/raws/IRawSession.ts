import Session from '../Session';

export default interface IRawSession extends Omit<Session, 'created_at' | 'expires_at'> {
  created_at: string;
  expires_at: string;
}
