

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Tic-Tac-Toe</h1>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">Player Setup</a>
          <a href="/game" className="text-white hover:text-gray-300">Game</a>
          <a href="/leaderboard" className="text-white hover:text-gray-300">Leaderboard</a>
        </div>
      </div>
    </nav>
  );
}