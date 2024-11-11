import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { OutputAuthUserDto } from './../dto/OutputAuthUserDto';
import { AuthServiceInputPort } from './../input/AuthServiceInputPort';
import { UserPersistence } from './../output/UserPersistenceOutputPort';
import { User } from '../domain/models/User';
import { Role } from '../domain/aggregates/Role';

@Injectable()
export class AuthService implements AuthServiceInputPort {
  constructor(
    @Inject('UserPersistence')
    private readonly userPersistence: UserPersistence,
  ) {}
  async login(
    email: string,
    password: string,
  ): Promise<OutputAuthUserDto | HttpException> {
    const user: any = await this.userPersistence.findByEmail(email);
    if (user) {
      const isPasswordValid = compareSync(password, user.password);
      if (isPasswordValid) {
        const roles: any = user.permissions.map((role) => {
          return new Role(role.name, role._id.toString());
        });
        return {
          token: sign(
            { sub: user._id, email: user.email, name: user.name },
            'secret',
            {
              expiresIn: '24h',
            },
          ),
          user: new User(
            user.name,
            user.email,
            user.password,
            roles,
            user._id.toString(),
          ),
        };
      }
    }
    throw new HttpException(
      'E-mail ou senha estão incorretos',
      HttpStatus.BAD_REQUEST,
    );
  }
}
