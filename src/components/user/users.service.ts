import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { ResourceModelsService } from 'src/utils/services/common/resource-models.service';

@Injectable()
export class UsersService extends ResourceModelsService<User> {
    constructor(@InjectModel(User) userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService) {
      super(userModel);
    }

    async register(userData){
      try {
        const hashedPassword = this.bcryptService.createHash(userData.password);
        const newUser = { ...userData, password: hashedPassword };

        const user = await this.create(newUser);
        const token = await this.jwtService.generate({ id: user.id });

        const updatedUser = await user.update({token});
        await updatedUser.reload()

        return { status: 201, user: updatedUser };
      } catch (error) {
        console.log('Error during registration:', error);
        return { status: 500, message: 'Registration failed' };
      }        
    }
}

