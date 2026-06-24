import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  joinedAt: Date;
}

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
  createdAt: Date;
}

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  rank: number;
  points: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinedAt: { type: Date, default: () => new Date() },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: { type: Date, default: () => new Date() },
});

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: () => new Date() },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
export const TeamModel = mongoose.model<ITeam>('Team', teamSchema);
export const ActivityModel = mongoose.model<IActivity>('Activity', activitySchema);
export const WorkoutModel = mongoose.model<IWorkout>('Workout', workoutSchema);
export const LeaderboardModel = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
