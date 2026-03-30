import 'dotenv/config';
import express, { Request, Response } from 'express';
import { errorHandler } from './presentation/middlewares/errorHandler';
import { userRoutes } from './presentation/routes/user.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Feedback Hub API is running',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
