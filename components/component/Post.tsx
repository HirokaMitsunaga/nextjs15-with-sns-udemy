import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon, ClockIcon } from "./Icons";
import { PostInteraction } from "./PostInteraction";

export const Post = ({ post }: any) => {
  return (
    <div className="space-y-4">
      <div
        key={post.id}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
      >
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{post.author.name}</h3>
            <p className="text-muted-foreground">{post.author.username}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p>{post.content}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <PostInteraction />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ClockIcon className="h-5 w-5" />
            <span>{post.createdAt.toLocaleString()}</span>
          </div>
        </div>
        {/* {post.comments && (
          <div className="mt-4 border-t pt-4 space-y-2">
            {post.comments.map((comment, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{comment.author}</p>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <HeartIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};
