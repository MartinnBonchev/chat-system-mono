import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  override async canActivate(context: ExecutionContext) {
    const canActivate: any = await super.canActivate(context);

    return canActivate;
  }
}
