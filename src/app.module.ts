import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
// import { ResourceModelsService } from './utils/services/common/resource-models.service';
import { Role } from './models/role.model';
import { RoleModule } from './components/role/role.module';

import { MySqlDialect } from '@sequelize/mysql';
import { UserModule } from './components/user/user.module';
import { AuthController } from './components/auth/auth.controller';
import { AuthService } from './components/auth/auth.service';
import { JwtService } from './utils/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigServiceSingleton } from './config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from './utils/bcrypt/bcrypt.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación sin necesidad de importarlo en otros módulos
    }),
    JwtModule.registerAsync({
      inject: [ConfigServiceSingleton],
      useFactory: async (configService: ConfigServiceSingleton) => {
        const jwtConfig = configService.getJWTCredentials();
        return {
          secret: jwtConfig.secret as string,
          signOptions: { expiresIn: jwtConfig.expiresIn },
        };
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'javalabs',
      autoLoadModels: true, // Cargar modelos automáticamente
      synchronize: true // Sincroniza la base de datos
    }),
    RoleModule,
    UserModule
  ],
  controllers: [ AppController, AuthController ],
  providers: [ AppService, AuthService, JwtService, ConfigServiceSingleton, BcryptService ],
  exports: [],
})
export class AppModule {}
