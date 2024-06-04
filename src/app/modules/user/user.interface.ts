import { UserRole } from '@prisma/client';

export type IUserFilters = {
  searchTerm?: string;
  role?: UserRole;
};
