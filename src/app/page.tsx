import Link from "next/link";
import GameList from "~/components/GameList";
import { db } from "~/server/db";

export default async function HomePage() {
  const games = await db.query.games.findMany();
  console.log(games);
  return (
    <main>
      <GameList games={games} />
    </main>
  );
}
