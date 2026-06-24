import { connectDatabase, mongoUri, mongoose } from '../config/database';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from '../models';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();
  console.log('Connected to MongoDB for seeding:', mongoUri);

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    { name: 'Avery Brooks', email: 'avery.brooks@octofit.com' },
    { name: 'Jordan Kim', email: 'jordan.kim@octofit.com' },
    { name: 'Sam Patel', email: 'sam.patel@octofit.com' },
  ]);

  const teams = await TeamModel.create([
    { name: 'Cardio Crew', members: [users[0]._id, users[1]._id] },
    { name: 'Strength Squad', members: [users[1]._id, users[2]._id] },
  ]);

  await WorkoutModel.create([
    { title: 'Morning HIIT', difficulty: 'medium', durationMinutes: 25, focus: 'endurance' },
    { title: 'Recovery Yoga', difficulty: 'easy', durationMinutes: 40, focus: 'mobility' },
    { title: 'Power Lift', difficulty: 'hard', durationMinutes: 50, focus: 'strength' },
  ]);

  await ActivityModel.create([
    { user: users[0]._id, type: 'running', durationMinutes: 30, calories: 320, date: new Date('2026-06-20T07:30:00Z') },
    { user: users[1]._id, type: 'cycling', durationMinutes: 45, calories: 480, date: new Date('2026-06-21T09:00:00Z') },
    { user: users[2]._id, type: 'strength training', durationMinutes: 55, calories: 520, date: new Date('2026-06-22T18:15:00Z') },
  ]);

  await LeaderboardModel.create([
    { user: users[1]._id, rank: 1, points: 1850 },
    { user: users[0]._id, rank: 2, points: 1740 },
    { user: users[2]._id, rank: 3, points: 1620 },
  ]);

  console.log('Seed data inserted successfully.');
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB after seeding.');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
