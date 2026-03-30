import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IPasswordHasher } from '@application/ports/IPasswordHasher';
import { IJWTProvider } from '@application/ports/IJWTProvider';
import { AppError } from '@shared/errors/AppError';
import { LoginUserDTO, LoginUserResponseDTO } from './LoginUserDTO';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtProvider: IJWTProvider,
  ) {}

  async execute(data: LoginUserDTO): Promise<LoginUserResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    // Rule: Generic error message to prevent account enumeration
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await this.passwordHasher.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Sign the token with user subject and role
    const token = this.jwtProvider.sign({ sub: user.id, role: user.role });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }
}
