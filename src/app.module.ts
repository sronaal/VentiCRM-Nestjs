import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      host: process.env.DBHOST || 'localhost',
      port: 5432,
      username: process.env.USERNAMEDB || 'userpassword',
      password: process.env.PASSWORDDB || 'password',
      database: process.env.NAMEDB || 'venticrm',
      type:'postgres',
      entities:[User],
      synchronize: true
      
    }),
    AuthModule, CustomersModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
