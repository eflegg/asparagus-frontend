import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  border: 2px solid ${theme.colours.grey};
  flex-direction: column;
  ${theme.mediaQuery.md`
  flex-direction: row;
  display: flex;
  `}
`;

const TripleStalk = styled.div`
height: 60%;
width: 25%;
margin: 20px;
flex-direction: row;
border: solid purple;
`;

const SignUp = styled.div`
border: solid purple;
margin: 20px;
`;

export default function NewsletterSignup() {
    return (
      <Card>
        <SignUp>
            <p className="newsletter-header--primary">Sign up for News from the Asparagus Patch</p>
            <p className="newsletter-subheader--primary">Pleasently Infrequent updates from Asparagus Magazine</p>
            <input type= "text"/>
            <button className="btn--primary">Sign Up</button>
            </SignUp>
         <TripleStalk>
            
             <img src="triplestalk.svg" alt="asparagus triple stalk logo"></img>
           
        </TripleStalk>
        
      </Card>
    );
  }