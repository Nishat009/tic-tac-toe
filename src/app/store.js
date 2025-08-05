import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: { player1: '', player2: '' },
  currentPlayer: 'X',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  round: 1,
  scores: { player1: 0, player2: 0 },
  winner: null,
  leaderboard: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('leaderboard') || '[]') : [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayers(state, action) {
      state.players = action.payload;
    },
    makeMove(state, action) {
      const { row, col } = action.payload;
      if (state.board[row][col] === '' && !state.winner) {
        state.board[row][col] = state.currentPlayer;
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    checkWinner(state) {
      const board = state.board;
      const lines = [
        // Rows
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        // Columns
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        // Diagonals
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
      ];

      for (const line of lines) {
        if (line[0] && line[0] === line[1] && line[1] === line[2]) {
          state.winner = line[0] === 'X' ? state.players.player1 : state.players.player2;
          state.scores[line[0] === 'X' ? 'player1' : 'player2'] += 2;
          state.scores[line[0] === 'X' ? 'player2' : 'player1'] += 1;
          return;
        }
      }

      if (state.board.flat().every(cell => cell !== '')) {
        state.winner = 'Draw';
      }
    },
    nextRound(state) {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.currentPlayer = 'X';
      state.winner = null;
      state.round += 1;

      if (state.round > 5 || state.scores.player1 >= 3 || state.scores.player2 >= 3) {
        state.leaderboard.push(
          { name: state.players.player1, score: state.scores.player1 },
          { name: state.players.player2, score: state.scores.player2 }
        );
        localStorage.setItem('leaderboard', JSON.stringify(state.leaderboard));
      }
    },
    resetGame(state) {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.currentPlayer = 'X';
      state.winner = null;
      state.round = 1;
      state.scores = { player1: 0, player2: 0 };
    },
    resetLeaderboard(state) {
      state.leaderboard = [];
      localStorage.setItem('leaderboard', JSON.stringify([]));
    },
  },
});

export const { setPlayers, makeMove, checkWinner, nextRound, resetGame, resetLeaderboard } = gameSlice.actions;

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export default store;