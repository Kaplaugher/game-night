import GameList from "~/components/GameList";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const games = await db.query.games.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  console.log(games);
  return (
    <main>
      <GameList games={games} />
    </main>
  );
}
