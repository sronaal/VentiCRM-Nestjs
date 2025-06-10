import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';


@Module({
  imports: [AuthModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
