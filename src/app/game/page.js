'use client';

import { Provider } from 'react-redux';
import store from '../store';
import Navbar from '@/components/Navbar';
import Game from '@/components/Game';

export default function GamePage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Game />
      </div>
    </Provider>
  );
}