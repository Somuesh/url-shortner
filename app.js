import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import urlsRouter from './routes/urls.js';
import cors from 'cors';


dotenv.config({ path: './config/.env' });

const app = express();

//connect Database
connectDB();

app.use(cors({
  origin: 'http://localhost:3000'
}));
// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middlewares
app.use('/', indexRouter);
app.use('/api', urlsRouter);

// Server Setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});