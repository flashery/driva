import express from 'express';
import cors from 'cors';
import { calculateMonthlyPayment } from '@driva/utils'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Driva backend is running 🚀');
  calculateMonthlyPayment(10000, 5, 5);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});