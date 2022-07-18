import Link from "next/link";
import { getGeneralPage, getSlugs } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const ContentContainer = styled.div`
  ul {
  }
  ol {
    padding-left: 0;
  }
  li {
    list-style: ;
  }
`;

export default function GeneralPage({ genpage }) {
  return (
    <PageWrapper className="container pt-5">
      <h1 className="text-center pb-5">{genpage.title.rendered}</h1>
      <ContentContainer
        className="content-container"
        dangerouslySetInnerHTML={{ __html: genpage.content.rendered }}
      ></ContentContainer>
      <p>{genpage.acf.text_block && genpage.acf.text_block}</p>
      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
    </PageWrapper>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("general_pages");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const genpages = await getGeneralPages();
  const genpage = await getGeneralPage(params.slug);

  return {
    props: {
      genpage,
    },
    revalidate: 10, // In seconds
  };
}
