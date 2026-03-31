// feedback-hub/src/server.ts
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // <-- Add this import
import { errorHandler } from './presentation/middlewares/errorHandler';
import { userRoutes } from './presentation/routes/user.routes';
import { feedbackRoutes } from './presentation/routes/feedback.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/feedbacks', feedbackRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Feedback Hub API is running',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
