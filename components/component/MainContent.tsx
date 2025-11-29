import PostForm from "./PostForm";
import PostList from "./PostList";

export default function MainContent() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-6">
      <PostForm />
      <PostList />
    </div>
  );
}
