import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            shopId: user.shopId
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                shopId: user.shopId,
            },
        };
    }

    async register(email: string, password: string, name: string, role: string = 'CUSTOMER') {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role as any,
                phone: email, // temporary - use email as phone
            },
        });

        const { password: _, ...result } = user;
        return result;
    }

    async createSuperAdmin() {
        const existingAdmin = await this.prisma.user.findUnique({
            where: { email: 'admin@cafeos.com' },
        });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('password', 10);

            await this.prisma.user.create({
                data: {
                    email: 'admin@cafeos.com',
                    password: hashedPassword,
                    name: 'Sumit (Platform Owner)',
                    role: 'SUPER_ADMIN',
                    phone: 'admin',
                },
            });

            console.log('✅ Super admin created: admin@cafeos.com / password');
        }
    }
}
