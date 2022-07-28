import { Constant } from '../../models/constant';

export interface ConstantCreationDto extends Pick<Constant, 'name'> {
  code?: string;
}
