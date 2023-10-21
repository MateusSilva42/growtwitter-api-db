import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.listen(process.env.PORTA, () => console.log('Servidor rodando na porta ', process.env.PORTA))
app.get('/', (req, res) => res.status(200).json({ok:true}) );

app.use(routes.router);