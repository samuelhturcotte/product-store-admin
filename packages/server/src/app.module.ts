import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CommunicationModule } from './modules/communication/communication.module';
import { ProductsModule } from './modules/products/products.modules';

ConfigModule.forRoot();

// Extended 'User' type of Passportjs
// TODO: Move somewhere else
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: number;
    }
  }
}

@Module({
  imports: [AuthModule, UserModule, ProductsModule, CommunicationModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
