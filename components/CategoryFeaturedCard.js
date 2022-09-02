import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
const Card = styled.div`
  margin-bottom: 60px;
  ${theme.mediaQuery.sm`
    margin-bottom: 100px;
    `}
  .card--image {
    position: relative;
    height: 250px;
    top: 0;
    ${theme.mediaQuery.sm`
    height: 315px;
    `}
    h3 {
      color: white;
      position: absolute;
      bottom: 40px;
      width: 75%;
      left: 36px;
      ${theme.mediaQuery.sm`
    width: 60%;
    left: 110px;
    `}
    }
  }
  .text-container {
    background: ${theme.colours.darkWheat};
    padding: 15px 35px 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${theme.mediaQuery.md`
    flex-direction: row;
    justify-content: space-between;
    padding: 35px 100px 58px;
    `}
    .article-details {
      align-self: flex-end;
      .byline--image {
        margin-left: 10px;
      }
      ${theme.mediaQuery.md`
      margin-left: 20px;
      align-self: initial;
      `}
    }
    .excerpt {
      width: 80%;
      font-family: ${theme.type.semibold};
      margin-bottom: 30px;
      ${theme.mediaQuery.md`
      margin-bottom: 0;
      width: 70%;
      `}
    }
  }
`;

// needs categories, reading time, date, image

export default function CategoryFeaturedCard({ post }) {
  let initialDate = post?.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      {post ? (
        <Card>
          <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
            <a>
              <div className="card--image">
                {post._embedded["wp:featuredmedia"] ? (
                  <Image
                    src={post._embedded["wp:featuredmedia"]["0"].source_url}
                    layout="fill"
                    objectFit="cover"
                    alt={post._embedded["wp:featuredmedia"]["0"].alt_text}
                  />
                ) : (
                  <Image
                    src="/triplestalk.svg"
                    layout="fill"
                    objectFit="cover"
                    alt="Asparagus Magazine logo"
                  />
                )}

                <h3
                  className=""
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></h3>
              </div>
              <div className="text-container">
                <div className="excerpt">
                  <p className="deck--topic-feature">{post.acf.dek}</p>
                </div>

                {post.acf.writer[0].acf.contributor ? (
                  <Link
                    href={"/contributors/[slug]"}
                    as={`/contributors/${post.acf.writer[0].post_name}`}
                  >
                    <div className="article-details">
                      <div>
                        <p className="byline--article-card">
                          {post.acf.writer[0].post_title}
                        </p>
                        <p className="date--article-card">
                          {formattedDate} -{" "}
                          <span>{post.acf.time_to_read} min read</span>
                        </p>
                      </div>
                      <div className="byline--image">
                        {post.acf.writer[0].acf.headshot.url ? (
                          <Image
                            src={post.acf.writer[0].acf.headshot.url}
                            layout="fill"
                            objectFit="cover"
                            alt="Author headshot"
                          />
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={"/team/[slug]"}
                    as={`/team/${post.acf.writer[0].post_name}`}
                  >
                    <div className="article-details">
                      <div>
                        <p className="byline--article-card">
                          {post.acf.writer[0].post_title}
                        </p>
                        <p className="date--article-card">
                          {formattedDate} -{" "}
                          <span>{post.acf.time_to_read} min read</span>
                        </p>
                      </div>
                      <div className="byline--image">
                        {post.acf.writer[0].acf.headshot.url ? (
                          <Image
                            src={post.acf.writer[0].acf.headshot.url}
                            layout="fill"
                            objectFit="cover"
                            alt="Author headshot"
                          />
                        ) : null}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </a>
          </Link>
        </Card>
      ) : (
        <h1>
          probably a 404 or redirect in case anyone accidentally lands here
        </h1>
      )}
    </>
  );
}
