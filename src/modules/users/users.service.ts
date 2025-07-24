import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}
  async registerUser(dto: RegisterUserDto): Promise<number> {
    const passwordHash = await this.cryptoService.generateHash(dto.password);
    const user = new User();

    user.age = dto.age;
    user.email = dto.email;
    user.name = dto.name;
    user.passwordHash = passwordHash;

    const createdUser = await this.usersRepository.save(user);

    return createdUser.id;
  }

  getAllUsers() {
    return this.usersRepository.findAll();
  }
}
