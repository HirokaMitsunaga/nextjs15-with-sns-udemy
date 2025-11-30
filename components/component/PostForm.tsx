"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { addPostAction } from "@/lib/actions";
import { SubmmitButton } from "./SubmmitButton";

export default function PostForm() {
  const [error, setError] = useState<string | undefined>("");
  //useRefで送信後のテキストをクリアする
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await addPostAction(formData);
    if (!result.success) {
      setError(result.error);
    } else {
      setError("");
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex items-center flex-1"
        >
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 rounded-full bg-muted px-4 py-2"
            name="post"
          />
          <SubmmitButton />
        </form>
      </div>
      {error && <p className="text-destructive text-sm ml-14">{error}</p>}
    </div>
  );
}
