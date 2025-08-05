import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { resetGame } from '@/app/store';

export default function VictoryScreen() {
  const { players, scores, round } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const router = useRouter();

  const finalWinner =
    scores.player1 > scores.player2
      ? players.player1
      : scores.player2 > scores.player1
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
        {finalWinner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${finalWinner}`}
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