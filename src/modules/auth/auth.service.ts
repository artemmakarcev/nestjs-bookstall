import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<{ userId: number }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.cryptoService.compare(
      password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return { userId: user.id };
  }

  login(userId: number) {
    const token = this.jwtService.sign({ userId });

    return {
      accessToken: token,
    };
  }
}
