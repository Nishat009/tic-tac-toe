'use client';
import { Provider } from 'react-redux';
import store from '../store';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';

export default function LeaderboardPage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Leaderboard />
      </div>
    </Provider>
  );
}