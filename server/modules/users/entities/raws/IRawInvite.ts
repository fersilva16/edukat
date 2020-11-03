export default interface IRawInvite {
  id: string;

  uses: number;

  max_uses?: number;

  type_id?: string;

  owner_id: string;

  expires_at?: string;

  created_at: string;

  updated_at: string;
}
