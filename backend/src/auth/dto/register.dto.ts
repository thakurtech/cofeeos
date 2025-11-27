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
}
