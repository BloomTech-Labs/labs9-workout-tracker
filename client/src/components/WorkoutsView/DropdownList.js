import React, { Component } from 'react';
// import FontAwesome from 'react-fontawesome'

import styled from 'styled-components';

const DDWrapper = styled.div`
  user-select: none;
  position: relative;
  width: 222px;
  color: ${props => props.theme.themeWhite};
  border: solid red;
`;

const DDHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 38px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  cursor: default;
  position: relative;
  background-color: ${props => props.theme.accent};
`;

const DDHeaderTitle = styled.div`
  font-weight: 300;
  margin: 2px 20px;
  margin-right: 30px;
`;

const DDList = styled.ul`
  z-index: 10;
  position: absolute;
  width: 100%;
  border: 1px solid rgb(223, 223, 223);
  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: white;
  box-shadow: 0 2px 5px -1px rgb(232, 232, 232);
  font-weight: 700;
  padding: 15px 0;
  max-height: 215px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const DDListItem = styled.li`
  width: 100%;
  font-size: 1.5rem;
  padding: 8px 10px;
  line-height: 1.6rem;
  cursor: default;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;

  &.selected {
    color: white;
    background-color: #ffcc01;
  }

  &:hover {
    color: white;
    background-color: #ffcc01;
  }
`;

class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  close(timeOut) {
    this.setState({
      listOpen: false
    });
  }

  selectItem(title, id, stateKey) {
    this.setState(
      {
        headerTitle: title,
        listOpen: false
      },
      this.props.resetThenSet(id, stateKey)
    );
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;
    console.log('The list is: ', list);
    return (
      <DDWrapper>
        <DDHeader onClick={() => this.toggleList()}>
          <DDHeaderTitle>{headerTitle}</DDHeaderTitle>
          {listOpen ? <h1>UP</h1> : <h1>DOWN</h1>}
        </DDHeader>
        {listOpen && <DDList onClick={e => e.stopPropagation()} />}
      </DDWrapper>
    );
  }
}

export default DropdownList;
