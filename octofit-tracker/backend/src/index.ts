import express, { Request, Response } from 'express';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from './models';
import { connectDatabase, mongoUri } from './database';

const app = express();
app.use(express.json());

const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', port, database: 'octofit_db', baseUrl });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  const users = await UserModel.find().select('-__v');
  res.json({ data: users });
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  const teams = await TeamModel.find()
    .populate('members', 'name email')
    .select('-__v');
  res.json({ data: teams });
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  const activities = await ActivityModel.find()
    .populate('user', 'name email')
    .select('-__v');
  res.json({ data: activities });
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  const workouts = await WorkoutModel.find().select('-__v');
  res.json({ data: workouts });
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardModel.find()
    .populate('user', 'name email')
    .sort('rank')
    .select('-__v');
  res.json({ data: leaderboard });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('OctoFit Tracker API is running.');
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB:', mongoUri);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
