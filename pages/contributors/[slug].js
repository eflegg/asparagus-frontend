import Link from "next/link";
import Image from "next/image";
import { getContributor, getSlugs } from "../../utils/wordpress";
import styled from "styled-components";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import theme from "../../components/Global/Theme";

const ContribImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid slateblue;
  overflow: hidden;
`;

export default function EventPage({ contributor, posts }) {
  console.log("contributor id: ", contributor.id);
  console.log("posts: ", posts[0].acf.writer);

  return (
    <div className="container pt-5">
      <h1 className="text-center pb-5">{contributor.title.rendered}</h1>
      <ContribImage className="contrib--image">
        <Image
          src={contributor._embedded["wp:featuredmedia"]["0"].source_url}
          layout="fill"
          objectFit="cover"
          alt="Contributor photo"
        />
      </ContribImage>
      <div className="bio">
        <p>{contributor.acf.bio}</p>
      </div>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post.title.rendered}</li>;
        })}
      </ul>

      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
    </div>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("contributors");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const contributor = await getContributor(params.slug);
  const contributorPosts = await fetch(
    // `${Config.apiUrl}/wp-json/wp/v2/articles?writer=${contributor.id}`
    `${Config.apiUrl}/wp-json/wp/v2/articles?writer=58`
  );

  const posts = await contributorPosts.json();

  return {
    props: {
      contributor,
      posts,
    },
    revalidate: 10, // In seconds
  };
}
