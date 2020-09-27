export default interface IRawType {
  id: string;

  name: string;

  position: number;

  permissions: string;

  created_at: string | Date;

  updated_at: string | Date;
}
