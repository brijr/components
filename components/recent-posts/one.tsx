import * as Craft from "@/components/craft/layout";
import PostCard from "@/components/content/post-card";
import fjord from "@/fjord.config";
import Balancer from "react-wrap-balancer";
import { fetchPosts } from "@/lib/data";

export default async function RecentPosts({
  className,
  excludeId,
}: {
  className?: string;
  excludeId?: number;
}) {
  const posts = await fetchPosts(4, 0);

  // Filter out the post with the given ID and limit to three posts
  const filteredPosts = posts.data
    .filter((post: PostProps) => post.id !== excludeId)
    .slice(0, 3);

  return (
    <Craft.Section className="border-b">
      <Craft.Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">Latest posts from {fjord.site_name}</h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Read the latest from our blog. Discover new benefits and stay up
              to date on the Veteran community.
            </Balancer>
          </h4>
          <div className="m-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3 mt-6 md:mt-12">
            {filteredPosts.map((post: PostProps) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
}
