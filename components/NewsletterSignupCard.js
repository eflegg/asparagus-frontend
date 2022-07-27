import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const NewsletterBlock = styled.div`
  border: 2px solid ${theme.colours.grey};

  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: ${theme.colours.darkWheat};
  .signupWrapper {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    /* this is how you use the & in scss */
    &.wrapper--support {
      width: 100%;
    }
  }
`;

const TripleStalk = styled.div`
  height: 100%;
  min-width: 25%;
  /* ${theme.mediaQuery.md`
position: relative;
left: -40px;
`} */
  ${theme.mediaQuery.xs`
  flex-direction: row;
  height: 100%;
  `}
  flex-direction: row;
  border: solid purple;
  padding: 2%;
`;

const PhotoStyled = styled.div`
  width: 45%;
  min-width: 25%;
  border: 3px solid gold;
  object-fit: cover;

  flex: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SignUp = styled.div`
  border: 3px solid mediumseagreen;
  &.text--support {
    border: 3px solid rebeccapurple;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  /* ${theme.mediaQuery.md`
position: relative;
left: 40px;
`} */
  input {
    height: 38px;
    width: 280px;
    ${theme.mediaQuery.xs`
    width: 200px;
  `}
  }
`;

export default function NewsletterSignup({ title, subtitle, image, support }) {
  console.log("support: ", support);
  return (
    <NewsletterBlock>
      {/* @elizabeth this is how you use a prop in a ternary. if support exists, add this class. otherwise do nothing. apply signupWrapper regardless */}
      <div className={`${support ? "wrapper--support" : " "} signupWrapper`}>
        <SignUp className={`${support ? "text--support" : " "} `}>
          <p className="newsletter-header--primary">{title}</p>
          <p className="newsletter-subheader--primary">{subtitle}</p>
          <div className="flex-row">
            <input type="text" />
            <button className="btn--primary">Sign Up</button>
          </div>
        </SignUp>

        {support ? (
          <PhotoStyled>
            <img src={image} alt="nature image" />
          </PhotoStyled>
        ) : (
          <TripleStalk>
            <img src={image} alt="asparagus logo" />
          </TripleStalk>
        )}
      </div>
    </NewsletterBlock>
  );
}
