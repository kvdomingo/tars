import { timestamps } from "@/db/schema/helpers";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  ...timestamps,
  id: varchar({ length: 26 }).primaryKey().default(sql`idkit_ulid_generate()`),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).unique(),
  emailVerified: timestamp({ mode: "date" }),
  image: text(),
});

export const sessions = pgTable("session", {
  sessionToken: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp({ mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: timestamp({ mode: "date" }).notNull(),
  },
  verificationToken => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text().notNull().unique(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text().notNull(),
    credentialPublicKey: text().notNull(),
    counter: integer().notNull(),
    credentialDeviceType: text().notNull(),
    credentialBackedUp: boolean().notNull(),
    transports: text(),
  },
  authenticator => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

export const conversations = pgTable("conversations", {
  ...timestamps,
  id: varchar({ length: 26 }).default(sql`idkit_ulid_generate()`).primaryKey(),
  title: varchar({ length: 255 }).default("New Conversation").notNull(),
  user_id: varchar({ length: 26 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const chats = pgTable("chats", {
  ...timestamps,
  id: varchar({ length: 26 }).default(sql`idkit_ulid_generate()`).primaryKey(),
  conversation_id: varchar({ length: 26 })
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  role: varchar({ length: 16, enum: ["system", "user", "assistant"] }).notNull(),
  message: text().notNull(),
});
