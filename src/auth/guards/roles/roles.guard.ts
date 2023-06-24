import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/utils/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    console.log(requiredRoles)
    if (!requiredRoles) {
      return true; // No role required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(user)
    if (!user || !requiredRoles.includes(user.role)) {
      return false; // User doesn't have the required role, deny access
    }
    return true; // User has the required role, allow access
  }
}
