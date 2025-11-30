import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!CLERK_WEBHOOK_SIGNING_SECRET) {
    throw new Error("CLERK_WEBHOOK_SIGNING_SECRETが設定されていません");
  }

  // ヘッダーを取得
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // ヘッダーが存在しない場合はエラー
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    });
  }

  // リクエストボディを取得
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Svixインスタンスを作成
  const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

  let evt: WebhookEvent;

  // Webhookを検証
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  if (eventType === "user.created") {
    try {
      const webhookData = JSON.parse(body).data;

      // usernameがnullの場合は、メールアドレスの@前部分 + ランダム4桁で生成
      let username = webhookData.username;
      if (!username && webhookData.email_addresses?.[0]?.email_address) {
        const emailPrefix =
          webhookData.email_addresses[0].email_address.split("@")[0];
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        username = `${emailPrefix}_${randomSuffix}`;
      } else if (!username) {
        // メールもない場合はIDから生成
        username = `user_${evt.data.id.slice(-8)}`;
      }

      await prisma.user.create({
        data: {
          id: evt.data.id,
          clerkId: evt.data.id,
          username: username,
          image: webhookData.image_url,
        },
      });
      return new Response("User has been created!", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Filed to create the user!", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    try {
      const webhookData = JSON.parse(body).data;

      // usernameがnullでない場合のみ更新データに含める
      const updateData: any = {
        image: webhookData.image_url,
      };

      if (webhookData.username) {
        updateData.username = webhookData.username;
      }

      await prisma.user.update({
        where: {
          id: evt.data.id,
        },
        data: updateData,
      });
      return new Response("User has been updated!", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Filed to updated the user!", { status: 500 });
    }
  }

  return new Response("Webhooks received", { status: 200 });
}
