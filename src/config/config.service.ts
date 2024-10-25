import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigServiceSingleton {
  private readonly variables: Record<string, any>;

  constructor(private readonly configService: ConfigService) {
    this.variables = {
      port: this.configService.get<number>('PORT'),
      apiKey: this.configService.get<string>('API_KEY'),
      database: {
        dialect: this.configService.get<string>('DB_DIALECT'),
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_DATABASE'),
      },
      jwt: {
        algorithm: this.configService.get<string>('JWT_ALGORITHM'),
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<number>('JWT_EXPIRES_IN')
      }
    };
  }

  getDBCredentials(): Record<string, string|number> {
    return this.variables.database;
  }

  getPort(): number {
    return this.variables.port;
  }

  getApiKey(): string {
    return this.variables.apiKey;
  }

  getJWTCredentials(): Record<string, string|number> {
    return this.variables.jwt;
  }

}
