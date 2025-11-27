import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    phone: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    role?: any; // Using any to avoid circular dependency with Role enum, or import it if possible
}
