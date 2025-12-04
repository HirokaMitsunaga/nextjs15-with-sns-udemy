// components/PostList.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon, ClockIcon } from "./Icons";
import { auth } from "@clerk/nextjs/server";
import { fetchPosts } from "@/lib/postDataFecher";
import { Post } from "./Post";

export default async function PostList() {
  const { userId } = auth();
  if (!userId) {
    throw Error("ユーザが存在しません。");
  }
  const posts = await fetchPosts(userId);

  return (
    <div className="space-y-4">
      {posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div>ポストが見つかりません</div>
      )}
    </div>
  );
}
