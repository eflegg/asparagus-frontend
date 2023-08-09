import Link from "next/link";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import theme from "../Global/Theme";
import TwoAuthorCard from "../TwoAuthorCard";

const BylineContainer = styled.div`
  p {
    margin: 0 auto;
  }
`;

export default function Byline({ article }) {
  let initialDate = article.acf.publication_date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <BylineContainer className="article-details">
        {article.acf.secondary_author == "Yes" ? (
          <TwoAuthorCard post={article} />
        ) : (
          <>
            {article.acf.writer[0].acf.contributor ? (
              <Link
                href={"/contributors/[slug]"}
                as={`/contributors/${article.acf.writer[0].post_name}`}
              >
                <a className="d-flex align-items-center">
                  <div className="byline--image">
                    {article.acf.writer[0].acf.headshot.url ? (
                      <Image
                        src={article.acf.writer[0].acf.headshot.url}
                        layout="fill"
                        objectFit="cover"
                        alt="Author headshot"
                      />
                    ) : (
                      <Image
                        src="/singlestalk-square.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="Author headshot"
                      />
                    )}
                  </div>
                  <div>
                    <p itemProp="author" className="byline">
                      {article.acf.writer[0].post_title}
                    </p>
                    <p
                      itemProp="datePublished"
                      className="date--single-article"
                    >
                      {formattedDate} -{" "}
                      <span>{article.acf.time_to_read} min read</span>
                    </p>
                  </div>
                </a>
              </Link>
            ) : (
              <Link
                href={"/team/[slug]"}
                as={`/team/${article.acf.writer[0].post_name}`}
              >
                <a className="d-flex byline-link">
                  <div className="byline--image">
                    {article.acf.writer[0].acf.headshot.url ? (
                      <Image
                        src={article.acf.writer[0].acf.headshot.url}
                        layout="fill"
                        objectFit="cover"
                        alt="Author headshot"
                      />
                    ) : (
                      <Image
                        src="/singlestalk-square.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="Author headshot"
                      />
                    )}
                  </div>
                  <div>
                    <p itemProp="author" className="byline">
                      {article.acf.writer[0].post_title}
                    </p>
                    <p
                      itemProp="datePublished"
                      className="date--single-article"
                    >
                      {formattedDate} -{" "}
                      <span>{article.acf.time_to_read} min read</span>
                    </p>
                  </div>
                </a>
              </Link>
            )}
          </>
        )}
      </BylineContainer>
    </>
  );
}
