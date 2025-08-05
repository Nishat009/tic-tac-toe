'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayers } from '@/app/store';
import { useRouter } from 'next/navigation';

export default function PlayerSetup() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = () => {
    if (player1.trim() && player2.trim()) {
      dispatch(setPlayers({ player1, player2 }));
      router.push('/game');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Player Setup</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          placeholder="Player 1 Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          placeholder="Player 2 Name"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          disabled={!player1.trim() || !player2.trim()}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          Start Match
        </button>
      </div>
    </div>
  );
}