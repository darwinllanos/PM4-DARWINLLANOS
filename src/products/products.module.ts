import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entity/categories.entity';
import { Products } from './entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Products]), CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
