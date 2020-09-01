import PartialUser from '../PartialUser';

export default interface IRawPartialUser extends Omit<PartialUser, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}
