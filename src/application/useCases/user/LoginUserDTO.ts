import { Role } from '../../../generated/prisma/client';

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface LoginUserResponseDTO {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
  };
  token: string;
}
