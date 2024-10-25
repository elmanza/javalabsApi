// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../../JWT/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authorization.split(' ')[1];
    const verified = await this.jwtService.verify(token);

    if (!verified) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = verified;
    return true;
  }
}
