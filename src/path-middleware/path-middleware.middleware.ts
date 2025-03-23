import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PathMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date()
    console.log(`Ejecutando el middleware con el metodo ${req.method} en la ruta ${req.path} a las ${date}`)
    next();
  }
}

export function PathMiddlewareMiddlewares(req: Request, res: Response, next: NextFunction){//Esto para hacer el middleware global
  const date = new Date()
  console.log(`Ejecutando el middleware con el metodo ${req.method} en la ruta ${req.path} a las ${date}`)
  next();
}

export function infologger(req: Request, res: Response, next: NextFunction){
  const token = req.headers.authorization?.split(' ')[1];

  console.log(token)
  next();
}
//Buscar el token
//muestre los datos del usuario, endpoint, nombre usuario ID
