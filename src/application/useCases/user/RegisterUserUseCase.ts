import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IPasswordHasher } from '@application/ports/IPasswordHasher';
import { AppError } from '@shared/errors/AppError';
import { RegisterUserDTO, RegisterUserResponseDTO } from './RegisterUserDTO';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(data: RegisterUserDTO): Promise<RegisterUserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('Email is already in use', 409);
    }

    const passwordHash = await this.passwordHasher.hash(data.password);

    const user = await this.userRepository.create({
      email: data.email,
      name: data.name,
      passwordHash,
      role: 'USER',
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
