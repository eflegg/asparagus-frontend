import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const Card = styled.div`
  border: 2px solid ${theme.colours.grey};
`;

// needs categories, reading time, date, image

export default function ArticleCard({
  title,
  slug,
  writer,
  photographer,
  excerpt,
  categories,
}) {
  console.log("categories: ", categories);

  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <p className="categories">
            {categories &&
              categories.map((category, index) => {
                return (
                  <a href={category.slug} key={uuidv4()}>
                    {category.name}
                  </a>
                );
              })}
          </p>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p className="writer">{writer}</p>
          <p className="photographer">{photographer}</p>
          <p className="excerpt">{excerpt}</p>
        </a>
      </Link>
    </Card>
  );
}

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};
