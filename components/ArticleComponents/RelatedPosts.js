import { v4 as uuidv4 } from "uuid";
import ArticleCard from "../ArticleCard";
import React, { useState, useEffect } from "react";

import { Config } from "../../config";
import fetch from "isomorphic-fetch";

export default function RelatedPosts({ currentArticle }) {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&per_page=100`
      );
      if (!response.ok) {
        // oops! something went wrong
        return;
      }
      const links = await response.json();
      setAllArticles(links);
    }

    loadLinks();
  }, []);

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
      if (currentTags.includes(tag)) {
        post.relevance++;
        // console.log("related tag name: ", tag);
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
      <hr className="hr--related" />
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
