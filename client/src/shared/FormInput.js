import React from 'react';
import styled, {css} from 'styled-components'

const FormInput = ({label, value, placeholder, onChange, type, lableColor}) => {
    return (
        <InputContainer lableColor={lableColor}r>
            <h3>{label}</h3>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </InputContainer>
    );
}

export default FormInput;

const InputContainer = styled.div`
  color: #5f697a;
  width: 100%;
  margin-bottom: 23px;
  h3 {
    display: block;
    font-weight: 700;
    font-size: 11px;
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
    font-size: 14px;
    color: #596377;
    outline: 0;
    width: 100%;
    &::-webkit-input-placeholder {
      opacity: 0.50;
    }
  }
`
