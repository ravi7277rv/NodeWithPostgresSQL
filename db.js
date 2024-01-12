// import { Client} from 'pg';
import pkg from 'pg'
const { Client } = pkg;
import  dotenv  from 'dotenv';
dotenv.config();


const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

client.connect((err) => {
    if(err){
        throw err;
    }

    console.log(`Connected to PostgresSQL`);
})

export default client;

























