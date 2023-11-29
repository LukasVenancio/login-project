import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import router from './routes/Router';

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

AppDataSource.initialize().then(async () => {
    console.log('Database OK');
    app.listen(3333, () => {
        console.log('Server started on port 3333');
    })
})