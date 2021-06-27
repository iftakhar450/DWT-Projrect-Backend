import dotenv from 'dotenv';

dotenv.config();


const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const MONGO_CONFIG = {
    URL: 'mongodb://localhost:27017/DWT'
}

// default User
const DEFAULT_USER = {
    username: 'root',
    password: 'root',
    role: 'admin',
    mobile_no: '091234325',
    user_id:'root',
    name:'root'

}

// Auth config
const AUTH = {
    PRIVATE_KEY: "DWT_Backend_Project",
}

const config = {
    server: SERVER,
    mongo: MONGO_CONFIG,
    default_user: DEFAULT_USER,
    auth: AUTH
};



export default config;