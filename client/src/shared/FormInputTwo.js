import React from 'react';
import styled, {css} from 'styled-components'

const FormInputTwo = ({label, value, placeholder, onChange, type, lableColor}) => {
    return (
        <InputContainer lableColor={lableColor}>
            <h3>{label}</h3>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </InputContainer>
    );
}

export default FormInputTwo;

const InputContainer = styled.div`
  color: #5f697a;
  width: 100%;
  margin-bottom: 23px;
  h3 {
    display: block;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 8px;
    text-align: left;
    letter-spacing: 1px;
    font-family: "Open Sans";
    text-transform: uppercase;
    color: #434C5E;
    ${props => props.lableColor === "white" && css`
        color: white;
  `}
  }
  input {
    border: 1px solid #D4D9E2;
    border-radius: 3px;
    padding: 15px;
    font-size: 1.4rem;
    color: #596377;
    outline: 0;
    width: 100%;
    &::-webkit-input-placeholder {
      opacity: 0.50;
    }
  }
`
