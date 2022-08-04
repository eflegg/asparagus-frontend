import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const NewsletterBlock = styled.div`
  position: relative;

  box-sizing: border-box;
  align-items: center;
  width: 100%;
  margin: 45px auto;
  background-color: ${theme.colours.darkWheat};
  .signupWrapper {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* this is how you use the & in scss */
    &.wrapper--support {
      width: 100%;
    }
  }
`;

const TripleStalk = styled.div`
  /* border: 3px solid orangered; */
  height: 100%;
  min-width: 40%;
  ${theme.mediaQuery.sm`
  min-width: 30%;
  `}
  ${theme.mediaQuery.md`
  position: relative;
  left: -40px;
  min-width: 30%;
  `}

  flex-direction: row;
  padding: 2%;
`;

const PhotoStyled = styled.div`
  width: 65%;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SignUp = styled.div`
  // &.text--support {
  //   border: 3px solid rebeccapurple;
  // }
  /* border: 3px solid rebeccapurple; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 0px 20px 20px;
  ${theme.mediaQuery.sm`
   padding: 30px;
  `}
  ${theme.mediaQuery.md`
  position: relative;
  left: 40px;
  padding: 40px;
  `}
  input {
    height: 38px;
    max-width: 280px;
    ${theme.mediaQuery.xs`
    width: 200px;
    margin-right: 20px;
  `}
  }
  &.text--support {
    padding: 45px;
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
          {support ? (
            <button className="btn--primary">Support</button>
          ) : (
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <input type="text" />
              <button className="btn--primary">Sign Up</button>
            </div>
          )}
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
