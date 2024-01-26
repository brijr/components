import Link from "next/link";
import React from "react";
import { ArrowTopRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

const PostTag = ({ name, id }: TagProps) => (
  <Badge key={id} variant={"secondary"}>
    {name}
  </Badge>
);

const PostCard = ({ post, tags = [] }: PostCardProps) => {
  const featuredMedia =
    post._embedded["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
      ?.source_url;
  const firstSentenceOfExcerpt = post.excerpt?.rendered.split(".")[0] + ".";

  return (
    <Link
      id="post-card"
      href={`/posts/${post.slug}`}
      className="group flex flex-col not-prose gap-2 transition-all hover:-mt-1 hover:mb-1"
      key={post.id}
    >
      {featuredMedia && (
        <div className="relative mb-2 h-56 overflow-hidden border shadow-sm rounded-md transition-all group-hover:opacity-75">
          {/* eslint-disable-next-line */}
          <img
            src={featuredMedia}
            alt={post.title.rendered}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2 hidden items-center text-sm transition-all group-hover:flex rounded-sm">
            <p className="sr-only">Read More</p>
            <ArrowTopRightIcon className="w-5 h-5" />
          </div>
        </div>
      )}

      <h3
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        className="text-primary mb-2 text-xl"
      ></h3>

      <div
        className="opacity-75 text-sm"
        dangerouslySetInnerHTML={{
          __html: firstSentenceOfExcerpt,
        }}
      />

      <div className="flex flex-wrap gap-1">
        {tags
          .filter((tag: TagProps) => tag.name.toLowerCase() !== "uncategorized")
          .map((tag: TagProps) => (
            <PostTag key={tag.id} {...tag} />
          ))}
      </div>
    </Link>
  );
};

export default PostCard;
