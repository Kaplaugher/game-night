import GameList from "~/components/GameList";

import { getGames } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const games = await getGames();
  return (
    <main>
      <GameList games={games} />
    </main>
  );
}
