import React from 'react';
import styled, { css } from 'styled-components';

const Button = props => {
  return (
    <StyledButton type={props.type} size={props.size} scheme={props.scheme} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  margin: 10px auto;
  height: 50px;
  line-height: 50px;
  padding: 0 60px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: box-shadow .2s ease,border .2s ease;
  transition: box-shadow .2s ease,border .2s ease,-webkit-box-shadow .2s ease;
  border-radius: 100px;
  outline: none;
  &:hover {
    box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.2)
  }
  background: ${props => props.theme.accent};
  border: none;
  color: #FFF;
  ${props =>
    props.scheme === 'cancel' &&
    css`
      background: ${props => props.theme.primaryDark};
    `}
  ${props =>
    props.scheme === 'delete' &&
    css`
      background: white;
      color: ${props => props.theme.accent};
      border: 2px solid ${props => props.theme.accent};
    `}
  ${props =>
    props.size === 'responsive' &&
    css`
      width: 100%;
    `}
  ${props =>
    props.size === 'large' &&
    css`
      width: 245px;
    `}
  ${props =>
    props.size === 'medium' &&
    css`
      width: 155px;
    `}
  ${props =>
    props.size === 'category' &&
    css`
      width: 245px;
      margin-left: 0px;
      margin-top: 20px;
      @media (max-width: 550px) {
        margin-left: auto;
      }
    `}
`;
