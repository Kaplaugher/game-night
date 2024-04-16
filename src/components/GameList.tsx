import Link from "next/link";

type Game = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: string;
  createdAt: string;
  updatedAt: string;
};

export default function GameList({ games }: { games: Game[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {games.map((game) => (
        <li key={game.id} className="relative">
          <Link
            href={`/games/${game.id}`}
            className="aspect-h-16 aspect-w-16 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
          >
            <img
              src="https://source.unsplash.com/random"
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {game.title}</span>
            </button>
          </Link>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {game.title}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {game.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
