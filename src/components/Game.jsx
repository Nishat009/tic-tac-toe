'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkWinner, makeMove, nextRound } from '@/app/store';

export default function Game() {
  const { board, currentPlayer, players, winner, round, scores } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (winner || round > 5 || scores.player1 >= 3 || scores.player2 >= 3) {
      router.push('/victory');
    }
  }, [winner, round, scores, router]);

  const handleClick = (row, col) => {
    dispatch(makeMove({ row, col }));
    dispatch(checkWinner());
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Tic-Tac-Toe - Round {round}</h2>
      <p className="text-center mb-4">
        Current Player: {currentPlayer === 'X' ? players.player1 : players.player2} ({currentPlayer})
      </p>
      <p className="text-center mb-4">
        Scores: {players.player1}: {scores.player1} | {players.player2}: {scores.player2}
      </p>
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              disabled={cell !== '' || winner}
              className="h-20 bg-white border rounded text-4xl font-bold flex items-center justify-center disabled:bg-gray-200"
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {winner && (
        <div className="text-center mt-4">
          <p className="text-xl font-bold">
            {winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}
          </p>
          <button
            onClick={() => dispatch(nextRound())}
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Next Round
          </button>
        </div>
      )}
    </div>
  );
}