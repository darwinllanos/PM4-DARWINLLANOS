import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";//Renombrar
import { registerAs } from "@nestjs/config";//Importa la funcion del config

dotenvConfig({ path: '.env.development'});//Cargar las variables de entrono

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,//Carga automaticamente las entidades
    synchronize: false,/*Permite cuando se armen los archivos de migracion correran de forma automatica */
    loggin: true, /*Loguea las query que hace a la bases de datos al ejecutar la aplicacion */
    entities: ['dist/**/*.entity{.ts,.js}'], //Ruta donde estan nuestras entities selecciona nuestros entities
    migrations: ['dist/migration/*{.ts,.js}'], //Se generaran los archivos de migraciones
}
export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)//Crear y exportar una nueva instancia del datasource