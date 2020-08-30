import Type from '../Type';

export default interface IRawType extends Omit<Type, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}
