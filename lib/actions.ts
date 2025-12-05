"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

type State = {
  error?: string | undefined;
  success: boolean;
};
export async function addPostAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const { userId } = auth();

  try {
    const postText = formData.get("post") as string;
    const postTextSchema = z
      .string()
      .min(1, "ポスト内容を入力してください")
      .max(140, "140字以内で入力してください");

    const validatePostText = postTextSchema.parse(postText);
    await prisma.post.create({
      data: {
        content: validatePostText,
        authorId: userId!,
      },
    });

    revalidatePath("/"); //投稿後にリロードせずに投稿を表示させる(理想は詳細のパスを指定する)

    return {
      success: true,
      error: undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors.map((e) => e.message).join(", "),
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      };
    } else {
      return {
        error: "予期せぬエラーが発生しました",
        success: false,
      };
    }
  }
}

export const likeAction = async (postId: string) => {
  "use server";
  const { userId } = auth();
  if (!userId) {
    throw new Error("ユーザーは認証されていません");
  }
  try {
    const exisitingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (exisitingLike) {
      await prisma.like.delete({
        where: {
          id: exisitingLike.id,
        },
      });
      revalidatePath("/");
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      revalidatePath("/");
    }
  } catch (err) {
    console.log(err);
  }
};
