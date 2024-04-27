"use server";
import "server-only";
import { handleError } from "~/lib/utils";
import { db } from "~/server/db";
import { gameTypes } from "~/server/db/schema";

export type CreateGameType = {
  name: string;
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
