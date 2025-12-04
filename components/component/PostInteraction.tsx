import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons";

type PostInteractionProps = {
  postId: string;
  initialLikes: string[];
  commentNumber: number;
};

export const PostInteraction = ({
  postId,
  initialLikes,
  commentNumber,
}: PostInteractionProps) => {
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon">
        <HeartIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <span className="-m1-1">{initialLikes.length}</span>
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
