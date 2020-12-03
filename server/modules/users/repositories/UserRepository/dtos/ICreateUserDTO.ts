export default interface ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  rememberMeToken?: string;

  typeId: string;
}
