import {
  Property,
} from '~/decorators';

export default class RememberUserDTO {
  @Property('token')
  token!: string;
}
