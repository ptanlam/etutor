import { Role } from '../models/identity/role';
import { ApplicationRole } from '../constants/models';

export function checkHavingRole(userRoleList: Role[], role: ApplicationRole) {
  return userRoleList.some((r) => r.name === role);
}
