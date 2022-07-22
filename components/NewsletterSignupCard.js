import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const NewsletterBlock = styled.div`
 border: 2px solid ${theme.colours.grey};
  flex-direction: row;
  width: 100%;
  ${theme.mediaQuery.md`
  flex-direction: row;
  `}
  display: flex;
`;

const TripleStalk = styled.div`
height: 100%;
max-width: 25%;
min-width: 25%; 
margin-right: 12%;
${theme.mediaQuery.sm`
  flex-direction: row;
  margin-right: 12%;
  height: 100%;
  `}
flex-direction: row;
border: solid purple;
padding: 2%;
`;

const SignUp = styled.div`
border: solid purple;

margin-left: 12%;
`;

export default function NewsletterSignup() {
    return (
      <NewsletterBlock>
        <SignUp>
            <p className="newsletter-header--primary">Sign up for News from the Asparagus Patch</p>
            <p className="newsletter-subheader--primary">Pleasently Infrequent updates from Asparagus Magazine</p>
            <input type= "text"/>
            <button className="btn--primary">Sign Up</button>
            </SignUp>
         <TripleStalk>
            
             <img src="triplestalk.svg" alt="asparagus triple stalk logo"></img>
           
        </TripleStalk>
        
      </NewsletterBlock>
    );
  }