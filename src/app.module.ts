import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      host: process.env.DBHOST || 'localhost',
      port: 5432,
      username: process.env.USERNAMEDB || 'userpassword',
      password: process.env.PASSWORDDB || 'password',
      database: process.env.NAMEDB || 'venticrm',
      type:'postgres'
    }),
    AuthModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
