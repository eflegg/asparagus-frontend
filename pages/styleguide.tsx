import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import React from "react";

export default function Styleguide() {
  return (
    <div className="styleguide—container">
      <h1>I am an h1 for page title </h1>
      <h2> I am an H2 for topic page and award feature head </h2>
      <h3> I am an H3 for single article head </h3>
      <h4> I am an H4 home feature head </h4>
      <h5> I am an H5 topic section label </h5>
      <h6> I am an H6 topic article card </h6>
      <h6 className="head--article-card"> I am an H6 head article card </h6>
      <p className="body">I am a body paragraph</p>
      <p className="deck--article-card">I am an article card deck</p>
      <p className="deck">I am a single article deck</p>
      <p className="byline">I am a byline</p>
      <p className="byline--article-card">I am an article card byline</p>
      <p className="date--article-card">I am a date on an article card</p>
      <p className="date--single-article">I am a date on a singl article</p>
      <p className="byline--index-feature">
        I am a byline on the home feature article
      </p>
      <p className="deck--index-feature">
        I am a deck on the home feature article
      </p>
      <p className="deck--topic-feature">
        I am a deck on the topic feature page
      </p>
      <p className="pullquote">i am a pullquote</p>
      <p className="contributor-name">i am contributor name</p>
      <p className="team-name">i am a team member name</p>
      <p className="newsletter-header--footer">
        i am the header for footer news sign up
      </p>
      <p className="newsletter-subheader--footer">
        i am a sub header in news sign up footer
      </p>
      <p className="newsletter-header--primary">
        i am the primary news sign up header
      </p>
      <p className="newsletter-subheader--primary">
        i am the primary news sign up subheader
      </p>
      <span className="topic-menu">Topic menu</span>
      <span className="footer-menu">i am a footer menu catagory</span>
      <a className="action-menu">Im an action menu item</a>
      <a className="footer-link">i am a footer item link</a>
      <button className="btn--primary"> I am a primary button</button>
    </div>
  );
}
