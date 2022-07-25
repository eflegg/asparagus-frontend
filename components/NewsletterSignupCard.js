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
  }
`;

const TripleStalk = styled.div`
height: 100%;
min-width: 25%;
${theme.mediaQuery.md`
position: relative;
left: -40px;
`}
${theme.mediaQuery.xs`
  flex-direction: row;
  height: 100%;
  `}
flex-direction: row;
border: solid purple;
padding: 2%;
`;

const SignUp = styled.div`
border: solid green;
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 30px;
${theme.mediaQuery.md`
position: relative;
left: 40px;
`}
input {
  height: 38px;
  width: 280px;
  ${theme.mediaQuery.xs`
    width: 200px;
  `}
}
`;

export default function NewsletterSignup() {
    return (
      <NewsletterBlock>
        <div className="signupWrapper">
        <SignUp>
            <p className="newsletter-header--primary">Sign up for News from the Asparagus Patch</p>
            <p className="newsletter-subheader--primary">Pleasently Infrequent updates from Asparagus Magazine</p>
            <div className="flex-row">
            <input type= "text"/>
            <button className="btn--primary">Sign Up</button>
            </div> 
            </SignUp>
         <TripleStalk>
          
             <img src="triplestalk.svg" alt="asparagus triple stalk logo"></img>
           
        </TripleStalk>
        </div>
      
      </NewsletterBlock>
    );
  }