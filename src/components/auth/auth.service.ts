import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {

    private COMMON_ROLE_ID = 4;

    constructor(
      private readonly userService: UsersService,
      private readonly bcryptService: BcryptService,
      private readonly jwtService: JwtService
    ){}

    async login(credentials): Promise<{}> {
      let { email, password } = credentials;
      let user = await this.userService.findOne({ email });
      if (!user || !this.bcryptService.isValidPassword(password, user)) {
        return { status: 401, message: 'Invalid credentials' };
      }
      const token = await this.jwtService.generate({id: user.id});
      await user.update({token});
      await user.reload();
      return { status: 200, user };
    }

    async register(user): Promise<{}>{
        let _usercreatedata = { ...user, role_id: this.COMMON_ROLE_ID };
        let user_created = await this.userService.register(_usercreatedata);
        return user_created;
    }
}
