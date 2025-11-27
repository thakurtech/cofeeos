import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
await authService.createSuperAdmin();

await app.listen(process.env.PORT ?? 3001);
console.log(`🚀 Server running on http://localhost:3001`);
}
bootstrap();
