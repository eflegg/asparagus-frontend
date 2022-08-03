import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  border: 4px solid ${theme.colours.gusGreen};
  height: 60vh;
  position: relative;
  h3 {
    position: absolute;
    top: 70px;
    margin: 3%;
    margin-right: 25%;
  }
  .image-container {
    border: solid blue;
    height: 60%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .award-text {
    border: 2px solid teal;
    padding: 3%;
    background-color: ${theme.colours.darkWheat};
  }
  .award-text--lower {
    border: solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .deck--topic-feature {
    margin-bottom: 20px;
  }
`;

const Image = styled.div`


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
          <div className="image-container">
          <img src={post._embedded["wp:featuredmedia"]["0"].source_url} alt=""></img>
          </div>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h3>
          <div className="award-text">
          <p className="deck--topic-feature">Textlandia Walking Tour taught me about Gentrification</p>
          <div className="award-text--lower">
          <p>Canadian Online Fublishing - Silver 2021</p>
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
                {formattedDate} - <span>{post.acf.time_to_read} min read</span>
              </p>
            </div>
          </div>
          </div>
          </div>
        </a>
      </Link>
    </Card>
  );
}
