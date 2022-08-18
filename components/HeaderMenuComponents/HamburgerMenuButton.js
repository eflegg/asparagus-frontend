import React from "react";
import styled from "styled-components";
import theme from "../Global/Theme";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
  .btn-nav {
    cursor: pointer;
    &:focus {
      outline: none;
    }
    height: 50px;
    width: 50px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    border: 0px;
    span {
      width: 35px;
      height: 5px;
      margin-bottom: 1px;
      border-radius: 3px;
      margin-top: 5px;
      background: ${theme.colours.soil};
      z-index: 2;
    }
    .burger-2 {
      position: relative;
    }
    &.nav-close {
      .burger-1 {
        position: relative;
        transform: rotate(-45deg);
        top: 8px;
        transition: all 0.15s ease-in-out;
      }
      .burger-2 {
        position: relative;
        background: transparent;
        transition: all 0.15s ease-in-out;
      }
      .burger-3 {
        position: relative;
        top: -15px;
        transform: rotate(45deg);
        transition: all 0.15s ease-in-out;
      }
    }
    &.nav-open {
      .burger-1 {
        transform: rotate(0deg);

        transition: all 0.15s ease-in-out;
      }
      .burger-2 {
        overflow: hidden;
        transition: all 0.15s ease-in-out;
      }
      .burger-3 {
        transform: rotate(0deg);
        transition: all 0.15s ease-in-out;
      }
    }
  }
`;

export default function HamburgerMenuButton({navActive, onClick}) {
    return (
      <ButtonContainer>
        <button
          className={`btn-nav ${navActive ? "nav-close" : "nav-open"}`}
          onClick={onClick}
        >
          <span className="burger-1"></span>
          <span className="burger-2"></span>
          <span className="burger-3"></span>
        </button>
        <button
          role="button"
          aria-controls="navMenu"
          style={{ display: "none" }}
          className="accessibility-close"
        >
        Close Nav
        </button>
      </ButtonContainer>
    )
}

HamburgerMenuButton.propTypes = {
    navActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };