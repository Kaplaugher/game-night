"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import "server-only";
import { handleError } from "~/lib/utils";
import { db } from "~/server/db";
import { gameTypes, games, users } from "~/server/db/schema";
import { DeleteGameParams } from "~/types";

export type CreateGameType = {
  name: string;
};
export type CreateGameParams = {
  userId: string;
  game: {
    title: string;
    description: string;
    location: string;
    image: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
  };
  path: string;
};

export const createGame = async ({ game, userId, path }: CreateGameParams) => {
  try {
    const organizer = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!organizer) throw new Error("Organizer not found");
    const newGame = await db
      .insert(games)
      .values({ ...game, organizer: userId })
      .returning();
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newGame[0]));
  } catch (error) {
    console.error(error);
  }
};

// GET ONE GAME BY ID
export async function getGameById(gameId: string) {
  try {
    const game = await db
      .select()
      .from(games)
      .where(eq(games.id, gameId))
      .leftJoin(users, eq(games.organizer, users.clerkId));

    if (!game) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(game));
  } catch (error) {
    console.error(error);
  }
}

// DELETE
export async function deleteGame({ gameId, path }: DeleteGameParams) {
  try {
    const deletedGame = await db.delete(games).where(eq(games.id, gameId));
    if (deletedGame) revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export const getGames = async ({ query, pageSize = 6, page = 1, gameType }) => {
  const allGames = await db
    .select()
    .from(games)
    .orderBy(games.createdAt)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .leftJoin(users, eq(games.organizer, users.clerkId));
  return allGames;
};

export async function getGameTypes() {
  const gameTypes = await db.query.gameTypes.findMany({
    orderBy: (model, { desc }) => desc(model.name),
  });
  return gameTypes;
}

// GET ONE GAME BY ID
export async function getGameTypeById(gameTypeId: string) {
  try {
    const gameType = await db
      .select()
      .from(gameTypes)
      .where(eq(gameTypes.id, gameTypeId));

    if (!gameType) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(gameType));
  } catch (error) {
    console.error(error);
  }
}

export const createGameType = async (gameType: CreateGameType) => {
  try {
    const newGameType = await db.insert(gameTypes).values(gameType).returning();
    return JSON.parse(JSON.stringify(newGameType[0]));
  } catch (error) {
    console.error(error);
  }
};
