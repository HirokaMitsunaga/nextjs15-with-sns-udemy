import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons";

export const PostInteraction = () => {
  return (
    <div>
      <Button variant="ghost" size="icon">
        <HeartIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button variant="ghost" size="icon">
        <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button variant="ghost" size="icon">
        <Share2Icon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
};
