// components/PostForm.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "./Icons";

export default function PostForm() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Input
        type="text"
        placeholder="What's on your mind?"
        className="flex-1 rounded-full bg-muted px-4 py-2"
        name="post"
      />
      <Button variant="ghost" size="icon">
        <SendIcon className="h-5 w-5 text-muted-foreground" />
        <span className="sr-only">Tweet</span>
      </Button>
    </div>
  );
}
