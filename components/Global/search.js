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
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
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
  border: 1px solid ${theme.colours.soil};
  border-radius: 5px;
  height: 30px;
  width: 100px;
  padding-left: 30px;
`;

export default function Search() {
  const router = useRouter();
  const [searchQuery, setQuery] = useState("");

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
      <Input type="text" onChange={(event) => setQuery(event.target.value)} />
      <div className="icon">
        <Image
          layout="responsive"
          width="50px"
          height="50px"
          src="/searchicon.png"
          alt="search icon"
        />
      </div>
    </SearchContainer>
  );
}
