import { AuthedContext } from 'src/type/auth';
import { AuthChecker } from 'type-graphql';

export const authChecker: AuthChecker<AuthedContext> = async ({ context }, roles) => {
  try {
    const auth = context.req.auth;
    if (!auth) return false;
    if (!roles || roles.length === 0) return true;
    const checkRoles = roles.findIndex((role) => role === auth.role);
    if (checkRoles > -1) return true;
    return false;
  } catch (error) {
    throw new Error('Token is not authenticated');
  }
};
