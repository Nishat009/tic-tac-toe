'use client';

import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// --- Game slice (without leaderboard) ---
const initialGameState = {
  players: { player1: '', player2: '' },
  currentPlayer: 'X',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  round: 1,
  roundWins: { player1: 0, player2: 0 },
  scores: { player1: 0, player2: 0 },
  winner: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
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
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
      ];

      for (const line of lines) {
        if (line[0] && line[0] === line[1] && line[1] === line[2]) {
          const roundWinner = line[0] === 'X' ? state.players.player1 : state.players.player2;
          state.winner = roundWinner;

          const winnerKey = roundWinner === state.players.player1 ? 'player1' : 'player2';
          const loserKey = winnerKey === 'player1' ? 'player2' : 'player1';

          state.roundWins[winnerKey] += 1;
          state.scores[winnerKey] += 2;
          state.scores[loserKey] += 1;

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
      state.roundWins = { player1: 0, player2: 0 };
      state.scores = { player1: 0, player2: 0 };
    },
    resetBoardOnly(state) {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.currentPlayer = 'X';
      state.winner = null;
    },
  },
});

// --- Leaderboard slice ---
const initialLeaderboardState = {
  leaderboard: [],
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: initialLeaderboardState,
  reducers: {
    addToLeaderboard(state, action) {
      if (Array.isArray(action.payload)) {
        state.leaderboard.push(...action.payload);
      } else {
        state.leaderboard.push(action.payload);
      }
    },
    resetLeaderboard(state) {
      state.leaderboard = [];
    },
  },
});

// --- Combine reducers ---
const rootReducer = combineReducers({
  game: gameSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
});

// --- Persist config ---
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['leaderboard'], // only persist leaderboard slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Store ---
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// --- Exports ---
export const {
  setPlayers,
  makeMove,
  checkWinner,
  nextRound,
  resetGame,
  resetBoardOnly,
} = gameSlice.actions;

export const { addToLeaderboard, resetLeaderboard } = leaderboardSlice.actions;
