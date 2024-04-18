import "server-only";
import { db } from "./db";

export async function getGames() {
  const games = await db.query.games.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return games;
}
