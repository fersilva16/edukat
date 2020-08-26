import User from '../User';

export default interface IRawUser extends Omit<User, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}
