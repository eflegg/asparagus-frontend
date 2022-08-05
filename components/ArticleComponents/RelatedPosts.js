import { v4 as uuidv4 } from "uuid";
import ArticleCard from "../ArticleCard";
import React from "react";
import { getRedirectStatus } from "next/dist/lib/load-custom-routes";

export default function RelatedPosts({ allArticles, currentArticle }) {
  // filter out current post
  let posts = allArticles.filter(
    (newPost) => newPost.slug !== currentArticle.slug
  );

  // define maxPosts to display
  const maxPosts = 3;

  const currentTags = currentArticle.tags;

  // rate posts depending on tags
  posts.forEach((post) => {
    post.relevance = 0;
    post.tags.forEach((tag) => {
      if (currentTags.includes(tag.name)) {
        post.relevance++;
      }
    });
  });

  // sort posts by relevance
  const sortedPosts = posts.sort(function (a, b) {
    return b.relevance - a.relevance;
  });

  return (
    <>
      <h5 className="related--header">Related Stories</h5>
      <hr />
      <div className="card--grid single-page">
        {sortedPosts.slice(0, maxPosts).map((post, i) => (
          <React.Fragment key={uuidv4()}>
            <ArticleCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
