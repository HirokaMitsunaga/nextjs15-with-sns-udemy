"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons";
import { likeAction } from "@/lib/actions";

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
  const [likeState, setlikeState] = useState({
    likeCount: initialLikes.length,
    isLiked: userId ? initialLikes.includes(userId) : false, //initialLikesの配列の中に自分のユーザidが入っていたらそれは、いいねを押したということになる。
  });

  const handleLikeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setlikeState((prev) => ({
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        isLiked: !prev.isLiked, //反転させる
      }));
      await likeAction(postId);
    } catch (err) {
      setlikeState((prev) => ({
        likeCount: prev.isLiked ? prev.likeCount + 1 : prev.likeCount - 1,
        isLiked: !prev.isLiked, //反転させる
      }));
      console.log(err);
    }
  };
  return (
    <div className="flex items-center">
      <form onSubmit={handleLikeSubmit}>
        <Button variant="ghost" size="icon">
          <HeartIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>
      <span className="-m1-1">{likeState.likeCount}</span>
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
