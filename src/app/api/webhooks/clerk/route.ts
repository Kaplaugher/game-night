import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, type WebhookEvent } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    // Do something with the user
    const { email_addresses, image_url, first_name, last_name, username } =
      evt.data;
    const user = {
      clerkId: id,
      email: email_addresses[0]?.email_address ?? "",
      image: image_url ?? "",
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username!,
    };
    // Save the user to database
    try {
      const newUser = await db.insert(users).values(user);

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser.id,
          },
        });
      }
      return new Response("Success creating user", { status: 200 });
    } catch (error) {
      console.error("Error saving user to database:", error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }
  if (eventType === "user.updated") {
    // Do something with the user
    const { email_addresses, image_url, first_name, last_name, username } =
      evt.data;
    const user = {
      clerkId: id,
      email: email_addresses[0]?.email_address ?? "",
      image: image_url ?? "",
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username!,
    };
    // Save the user to database
    try {
      await db.update(users).set(user).where(eq(users.clerkId, id));

      return new Response("Success updating user", { status: 200 });
    } catch (error) {
      console.error("Error saving user to database:", error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }
  if (eventType === "user.deleted") {
    try {
      await db.delete(users).where(eq(users.clerkId, id));
      return new Response("Success deleting user", { status: 200 });
    } catch (error) {
      console.error("Error deleting user from database:", error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}
