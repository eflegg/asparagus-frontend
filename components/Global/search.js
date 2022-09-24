import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import theme from "./Theme";
import { useRouter } from "next/router";

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  .icon {
    position: absolute;
    left: 3px;
    top: 3px;
    width: 25px;
    height: 25px;
  }
  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

const Input = styled.input`
  ${theme.mediaQuery.sm`

width: 100px;

border: 1px solid black;
border-radius: 5px;
`}
  background: transparent;
  height: 30px;
  width: ${(props) => (props.scrolled == true ? "120px" : "30px")};
  border: ${(props) => (props.scrolled == true ? "1px solid black" : "0px")};
  border-radius: 5px;
  padding-left: 30px;
  position: relative;
  z-index: 20;
`;

export default function Search({ scrolled }) {
  const router = useRouter();
  const [searchQuery, setQuery] = useState("");

  // console.log("search scrolled: ", scrolled);

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: "/search-results",
        query: { name: searchQuery },
      },
      "/search-results"
    );
  };

  return (
    <SearchContainer className="searchbar-container" onSubmit={onSubmit}>
      <label htmlFor="" className="visually-hidden">
        Search Bar
      </label>
      <Input
        scrolled={scrolled}
        type="text"
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="icon">
        <Image
          layout="responsive"
          width="50px"
          height="50px"
          src="/magnifying-glass-solid.svg"
          alt="search icon"
        />
      </div>
    </SearchContainer>
  );
}
