import { resetLeaderboard } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';

export default function Leaderboard() {
  const { leaderboard } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
      <button
        onClick={() => dispatch(resetLeaderboard())}
        className="mb-4 bg-red-500 text-white p-2 rounded"
      >
        Reset Leaderboard
      </button>
      <div className="bg-white p-4 rounded shadow">
        {leaderboard.length === 0 ? (
          <p className="text-center">No scores yet!</p>
        ) : (
          <ul className="space-y-2">
            {leaderboard.sort((a, b) => b.score - a.score).map((player, index) => (
              <li key={index} className="flex justify-between">
                <span>{player.name}</span>
                <span>{player.score}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}