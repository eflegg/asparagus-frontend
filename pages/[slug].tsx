import Link from "next/link";
import { getGeneralPage, getSlugs } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";
import React from "react";

const ContentContainer = styled.div`
  height: 100%;
  width: 90%;
  margin: 0 auto;
  img {
    height: 100%;
    width: 100%;
  }

  figure {
    display: table;
    margin: 50px auto;
  }
  figcaption {
    width: 90%;
    margin: 8px auto 0;
    font-family: ${theme.type.accent};
    font-size: 1.6rem;
    strong {
      font-family: ${theme.type.header};
      font-weight: bold;
      font-style: italic;
      position: relative;
      top: 5px;
    }
  }

  h2 {
    width: 90%;
    max-width: 680px;
    margin: 30px auto 20px;
    color: ${theme.colours.gusGreen};
    font-size: 1.8rem;
    @media ${theme.devices.sm} {
      font-size: 2.3rem;
    }
    @media ${theme.devices.md} {
      font-size: 2.8rem;
    }
  }

  ul {
    list-style: none;
  }
  ol {
    padding-left: 0;
  }
  li {
    margin: 0 auto 20px;
    width: 80%;
    max-width: 680px;
    letter-spacing: 0;
    list-style: disc;
  }
  p {
    letter-spacing: 0;
  }
  &.body-content {
    p {
      width: 90%;
      max-width: 680px;
      margin: 17px auto;
      letter-spacing: 0;
      @media ${theme.devices.sm} {
        margin: 25px auto;
      }
    }
    a {
      letter-spacing: 0;
    }
    em {
      /* font-size: 1.7rem; */
      font-weight: 600;
      font-family: inherit;
    }
    strong {
      em {
        /* font-size: 1.7rem; */
        font-weight: 800;
      }
    }
    a {
      text-decoration: underline;
      text-decoration-skip-link: auto;
      font-family: ${theme.type.body};
      color: black;
      font-weight: 400;
    }

    a:visited {
      color: ${theme.colours.soil};
    }

    a:hover {
      color: ${theme.colours.gusGreen};
    }

    a:active {
      color: ${theme.colours.gusYellow};
    }

    .wp-block-pullquote {
      p {
        font-size: 18px;
        font-weight: 600;
        color: ${theme.colours.gusGreen};
        width: 80%;
        margin: 20px auto;
        text-align: center;
        font-family: ${theme.type.semibold};
        @media ${theme.devices.md} {
          font-size: 2.8rem;
        }
        em {
          font-family: ${theme.type.italic};
          color: ${theme.colours.gusGreen};
          letter-spacing: 0;
          font-size: 18px;
          font-weight: 600;
          @media ${theme.devices.md} {
            font-size: 2.8rem;
          }
        }
      }
    }
  }
`;
const GeneralContainer = styled.div`
  .general--header {
    // height: 400px;
    width: 100%;
    position: relative;
    margin-bottom: 50px;
    margin-top: 35px;
    h1 {
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default function GeneralPage({ genpage }) {
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${genpage.slug}`}
      ogImageUrl={
        genpage.yoast_head_json.og_image
          ? genpage.yoast_head_json.og_image
          : genpage.acf.header.url
      }
      ogType={genpage.yoast_head_json.og_type}
      ogTwitterImage={
        genpage.yoast_head_json.twitter_card
          ? genpage.yoast_head_json.twitter_card
          : genpage.acf.header.url
      }
      SEOtitle={
        genpage.yoast_head_json.title
          ? genpage.yoast_head_json.title
          : "Asparagus Magazine"
      }
      metadescription={
        genpage.yoast_head_json.description
          ? genpage.yoast_head_json.title
          : `${genpage.title.rendered} - Telling the large and small stories of how we can live more sustainably`
      }
    >
      <GeneralContainer>
        <div className="general--header">
          <Image
            src={genpage.acf.header.url}
            layout="responsive"
            objectFit="cover"
            height="322px"
            width="1280px"
            alt={genpage.acf.header.alt_text}
            priority
          />
          <h1 className="text-center pb-5">{genpage.title.rendered}</h1>
        </div>

        <ContentContainer
          className="content-container body-content"
          dangerouslySetInnerHTML={{ __html: genpage.content.rendered }}
        ></ContentContainer>
        <p>{genpage.acf.text_block && genpage.acf.text_block}</p>
      </GeneralContainer>
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
  const genpages = await getGeneralPage();
  const genpage = await getGeneralPage(params.slug);

  const notFound = !genpage;

  return {
    props: {
      genpage,
    },
    //revalidate: 1200, // In seconds
    notFound,
  };
}
