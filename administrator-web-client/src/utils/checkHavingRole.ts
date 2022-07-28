import { Role } from '../models/identity';
import { ApplicationRole } from '../shared/enums';

export function checkHavingRole(userRoleList: Role[], role: ApplicationRole) {
  return userRoleList.some((r) => r.name === role);
}
