import express from 'express';
import cors from 'cors';
import loanRoutes from './routes/loan.routes';
import helmet from 'helmet';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const ROUTE_PREFIX = process.env.ROUTE_PREFIX || '';


app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(`${ROUTE_PREFIX}/`, loanRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});