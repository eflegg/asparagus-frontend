import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";

const Card = styled.div`
  // border: 4px solid ${theme.colours.gusGreen};
  position: relative;
  width: 100%;
  h3 {
    position: absolute;
    top: 220px;
    margin-left: 5%;
    width: 90%;
    color: white;
    z-index: 10;
    ${theme.mediaQuery.sm`
    top: 300px;
`}
    ${theme.mediaQuery.md`
    top: 170px;
    width: 90%;
   `}
   ${theme.mediaQuery.lg`
   width: 60%;
   `}
  }
  .image-container {
    /* // border: solid blue; */
    position: relative;
    height: 50vh;
    min-height: 350px;
    object-fit: cover;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .award-text-wrap {
    border: solid ${theme.colours.darkWheat};
    background-color: ${theme.colours.darkWheat};
  }
  .award-text {
    // border: 2px solid teal;
    margin-left: 5%;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-right: 5%;
  }
  .award-text--lower {
    // border: solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${theme.mediaQuery.md`
    flex-direction: row;
`}
  }
  .deck--topic-feature {
    margin-bottom: 20px;
  }

  .award-title {
    color: ${theme.colours.gusGreen};
    font-family: ${theme.type.italic};
    font-style: italic;
    margin: 20px 0 20px 0;
  }
  .article-details {
    // border: solid blue;
  }
  .award-graphic {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 100px;
    width: 100px;
  }
`;

export default function AwardWinnerCard({ post }) {
  console.log("award post: ", post);
  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
        <a>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h3>
          <div className="image-container">
            {post._embedded["wp:featuredmedia"]["0"].source_url ? (
              <Image
                src={post._embedded["wp:featuredmedia"]["0"].source_url}
                alt={post._embedded["wp:featuredmedia"]["0"].alt_text}
                layout="fill"
                objectFit="cover"
              />
            ) : null}
            {post.acf.award_graphic ? (
              <div className="award-graphic">
                <Image
                  src={post.acf.award_graphic.url}
                  alt={post.acf.award_graphic.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : null}
          </div>

          <div className="award-text-wrap">
            <div className="award-text">
              <p className="deck--topic-feature">{post.acf.dek}</p>
              <div className="award-text--lower">
                <p className="award-title">{post.acf.award_title}</p>
                <div className="article-details">
                  <div className="byline--image">
                    {post.acf.writer[0].acf.headshot.url && (
                      <Image
                        src={post.acf.writer[0].acf.headshot.url}
                        layout="fill"
                        objectFit="cover"
                        alt="Author headshot"
                      />
                    )}
                  </div>
                  <div>
                    <p className="byline--article-card">
                      {post.acf.writer[0].post_title}
                    </p>
                    <p className="date--article-card">
                      {formattedDate} -{" "}
                      <span>{post.acf.time_to_read} min read</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Card>
  );
}
