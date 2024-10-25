import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: NestJwtService) {}

    async generate(payload: object): Promise<string> {
      return this.jwtService.sign(payload);
    }
  
    async verify(token: string): Promise<any> {
      try {
        return this.jwtService.verify(token);
      } catch (error) {
        console.error('JWT verification error:', error);
        return null;
      }
    }
  
    async decode(token: string): Promise<any> {
      return this.jwtService.decode(token);
    }
}
