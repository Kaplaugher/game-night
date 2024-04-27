"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import "server-only";
import { handleError } from "~/lib/utils";
import { db } from "~/server/db";
import { gameTypes, games, users as usersTable } from "~/server/db/schema";

export type CreateGameType = {
  name: string;
};
export type GameType = {
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  image: string;
  startDateTime: Date;
  endDateTime: Date;
  organizer: string;
  gameType: string;
};

export async function getGames() {
  const games = await db.query.games.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return games;
}

export async function getGameTypes() {
  const gameTypes = await db.query.gameTypes.findMany({
    orderBy: (model, { desc }) => desc(model.name),
  });
  return gameTypes;
}

export const createGameType = async (gameType: CreateGameType) => {
  try {
    const newGameType = await db.insert(gameTypes).values(gameType).returning();
    return JSON.parse(JSON.stringify(newGameType[0]));
  } catch (error) {
    handleError(error);
  }
};

export const createGame = async (
  game: GameType,
  userId: string,
  path: string,
) => {
  try {
    const organizer = await db.query.usersTable.findFirst({
      where: eq(usersTable.clerkId, userId),
    });
    if (!organizer) throw new Error("Organizer not found");
    const newGame = await db.insert(games).values(game).returning();
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newGame[0]));
  } catch (error) {
    console.error(error);
  }
};
