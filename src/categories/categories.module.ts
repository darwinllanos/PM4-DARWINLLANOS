import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { Categories } from './entity/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController],
    exports: [CategoriesRepository]
})
export class CategoriesModule {}
