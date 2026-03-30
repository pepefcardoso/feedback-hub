import { Role } from '../../../generated/prisma/client';

export interface RegisterUserDTO {
  email: string;
  name: string;
  password: string;
}

export interface RegisterUserResponseDTO {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
