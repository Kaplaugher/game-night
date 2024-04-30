// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `game-night_${name}`);

export const users = createTable("user", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }),
  image: varchar("image", { length: 1024 }),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
});

export const gameTypes = createTable("game_type", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const games = createTable("game", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  description: varchar("description"),
  price: varchar("price"),
  isFree: boolean("is_free").notNull(),
  image: varchar("image", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  startDateTime: timestamp("start_time").notNull(),
  endDateTime: timestamp("end_time").notNull(),
  organizer: varchar("organizer")
    .references(() => users.clerkId)
    .notNull(),
  gameType: serial("game_type").references(() => gameTypes.id),
  location: varchar("location", { length: 256 }),
});
