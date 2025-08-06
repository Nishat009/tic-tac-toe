'use client';

import { useSelector, useDispatch } from 'react-redux';
import { resetGame } from '@/app/store';
import { useRouter } from 'next/navigation';

export default function VictoryScreen() {
  const { players, scores, roundWins, round } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const router = useRouter();

  const finalWinner =
    roundWins.player1 >= 3
      ? players.player1
      : roundWins.player2 >= 3
      ? players.player2
      : 'Draw';

  const handleRestart = () => {
    dispatch(resetGame());
    router.push('/game');
  };

  const handleNewMatch = () => {
    dispatch(resetGame());
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Match Results</h2>
      <p className="text-center mb-4">
        Final Scores: {players.player1}: {scores.player1} | {players.player2}: {scores.player2}
      </p>
      <p className="text-center text-xl font-bold mb-4">
        Round Wins: {players.player1}: {roundWins.player1} | {players.player2}: {roundWins.player2}
      </p>
      <p className="text-center text-xl font-bold mb-4">
        {finalWinner === 'Draw' ? 'It\'s a Draw!' : `Final Winner: ${finalWinner}`}
      </p>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={handleRestart}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Restart Match
        </button>
        <button
          onClick={handleNewMatch}
          className="bg-green-500 text-white p-2 rounded"
        >
          New Match
        </button>
      </div>
    </div>
  );
}