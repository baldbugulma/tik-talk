import { AuthService } from '@tt/data-access/auth/service/auth.service';
import { canActivateAuth } from './lib/auth/access.guard';
import { authTokenInterceptor } from './lib/auth/auth.interseptor';

export * from './lib/feature-login';
export { canActivateAuth, authTokenInterceptor, AuthService };
