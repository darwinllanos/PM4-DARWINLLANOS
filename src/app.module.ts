import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsService } from './order-details/order-details.service';
import { OrderDetailsModule } from './order-details/order-details.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    //*Configuracion del modulo de manera global
    ConfigModule.forRoot({
      isGlobal: true,//En todos los modulos se va a usar typeorm
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({//!Configuracion de TypeORM con opciones asincronas
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    JwtModule.register({//!Configuracion de JwtModule para la autenticacion JWT
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m'}
    }),
    AuthModule, 
    ProductsModule, 
    UsersModule, 
    OrdersModule, 
    OrderDetailsModule, 
    FileUploadModule],
  controllers: [],
  providers: [OrdersService, OrderDetailsService],//!Servicios que estaran como proveedores en el modulo
})
export class AppModule {}
