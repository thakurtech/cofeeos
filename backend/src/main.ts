import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Create super admin on first run
  const authService = app.get(AuthService);
  await authService.createSuperAdmin();

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Server running on http://localhost:3001`);
}
bootstrap();
