"use client";

import { FormEvent, useOptimistic, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons";
import { likeAction } from "@/lib/actions";

interface likeState {
  likeCount: number;
  isLiked: boolean;
}

type PostInteractionProps = {
  postId: string;
  initialLikes: string[];
  commentNumber: number;
  userId: string; //userIdはサーバーでしか取得できないためpropsで受け取る
};

export const PostInteraction = ({
  postId,
  initialLikes,
  commentNumber,
  userId,
}: PostInteractionProps) => {
  const initialiState = {
    likeCount: initialLikes.length,
    isLiked: userId ? initialLikes.includes(userId) : false, //initialLikesの配列の中に自分のユーザidが入っていたらそれは、いいねを押したということになる。
  };
  const [optimisticLike, addOptimisticLike] = useOptimistic<likeState, void>(
    initialiState,
    (currentState) => ({
      likeCount: currentState.isLiked
        ? currentState.likeCount - 1
        : currentState.likeCount + 1,
      isLiked: !currentState.isLiked,
    })
  );

  const handleLikeSubmit = async () => {
    try {
      addOptimisticLike();
      await likeAction(postId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center">
      <form action={handleLikeSubmit}>
        <Button variant="ghost" size="icon">
          <HeartIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>
      <span className="-m1-1">{optimisticLike.likeCount}</span>
      <Button variant="ghost" size="icon">
        <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <span className="-m1-1">{commentNumber}</span>
      <Button variant="ghost" size="icon">
        <Share2Icon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
};
