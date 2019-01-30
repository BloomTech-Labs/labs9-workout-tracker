import React from 'react';
import styled, {keyframes} from 'styled-components'

const FormModal = ({onSubmit, closeModal, children, title}) => {
    return (
        <ModalContainer>
            <ModalForm onSubmit={e => onSubmit(e)}>
              <ModalHeader>
                  <h2>{title}</h2>
                  <i onClick={e => closeModal(e)} className="fas fa-times"></i>
              </ModalHeader>
              {children}
            </ModalForm>
        </ModalContainer>
    );
}

export default FormModal;

const ModalHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  i {
    font-size: 22px;
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
  }
`;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
`;

const slideIn = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-450px);
  }
`;

const ModalForm = styled.form`
  width: 450px;
  height: 100vh;
  background-color: white;
  box-shadow: 1px 0px 10px 1px rgba(0,0,0,0.75);
  padding: 0px 40px;
  overflow: scroll;
  position: fixed;
  right: -450px;
  top: 0;
  animation: ${slideIn} 250ms ease-in forwards;
`;