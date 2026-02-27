import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    cloudinary:{
         name:process.env.CLOUDINARY_NAME,
         api_key:process.env.CLOUDINARY_API_KEY,
         secret_api:process.env.CLOUDINARY_SECRET_API
    }
}