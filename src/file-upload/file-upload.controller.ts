import { Controller, Param, Post, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { authGuard } from 'src/auth/authGuard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('File')
@ApiBearerAuth()
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @Post('uploadImage/:id')
  @UseGuards(authGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProduct(@Param('id', ParseUUIDPipe) id: string, @UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({
          maxSize: 2000000,
          message: 'Archivo demasiado grande'
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/,
        })
      ]
    })
  ) file: Express.Multer.File){
    try {
      console.log(file)
      return this.fileUploadService.uploadProductImage(file, id)
    } catch (error) {
      console.log(error);
        throw new BadRequestException("Error al cargar imagen")
    }
  }
}
