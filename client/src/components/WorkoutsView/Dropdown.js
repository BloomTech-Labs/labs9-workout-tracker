import React, { Component, useState, useEffect, useReducer } from 'react';
import DropdownList from './DropdownList';

import styled from 'styled-components';

const Dropdown = props => {
  const [state, dispatch] = useReducer(reducer, {
    category: 'Add a category'
  });
  const { categories } = 'Add a categery' || [];
  const [category, setCategory] = useState('add a category');

  // useEffect(() => {
  //   const resetThenSet = (id, key) => {
  //     let temp = JSON.parse(JSON.stringify(this.state[key]));
  //     temp.forEach(item => (item.selected = false));
  //     temp[id].selected = true;
  //     this.setState({
  //       [key]: temp
  //     });
  //   };
  // });

  function reducer(state, action) {
    switch (action.type) {
      case 'resetThenSet':
        return { category: state.category };
    }
  }

  return (
    <div className="Dropdown">
      <p>Dropdown menu examples</p>
      <div className="wrapper">
        <DropdownList
          title="Select Category"
          resetThenSet={() => dispatch({ type: 'resetThenSet' })}
        />
      </div>
    </div>
  );
};

export default Dropdown;

// class Dropdown extends Component {
//   constructor() {
//     super();
//     this.state = {
//       location: [
//         {
//           id: 0,
//           title: 'New York',
//           selected: false,
//           key: 'location'
//         },
//         {
//           id: 1,
//           title: 'Dublin',
//           selected: false,
//           key: 'location'
//         },
//         {
//           id: 2,
//           title: 'California',
//           selected: false,
//           key: 'location'
//         },
//         {
//           id: 3,
//           title: 'Istanbul',
//           selected: false,
//           key: 'location'
//         },
//         {
//           id: 4,
//           title: 'Izmir',
//           selected: false,
//           key: 'location'
//         },
//         {
//           id: 5,
//           title: 'Oslo',
//           selected: false,
//           key: 'location'
//         },
//         {
//           id: 6,
//           title: 'Zurich',
//           selected: false,
//           key: 'location'
//         }
//       ],
//       fruit: [
//         {
//           id: 0,
//           title: 'Apple',
//           selected: false,
//           key: 'fruit'
//         },
//         {
//           id: 1,
//           title: 'Orange',
//           selected: false,
//           key: 'fruit'
//         },
//         {
//           id: 2,
//           title: 'Grape',
//           selected: false,
//           key: 'fruit'
//         },
//         {
//           id: 3,
//           title: 'Pomegranate',
//           selected: false,
//           key: 'fruit'
//         },
//         {
//           id: 4,
//           title: 'Strawberry',
//           selected: false,
//           key: 'fruit'
//         }
//       ]
//     };
//   }

//   toggleSelected = (id, key) => {
//     let temp = JSON.parse(JSON.stringify(this.state[key]));
//     temp[id].selected = !temp[id].selected;
//     this.setState({
//       [key]: temp
//     });
//   };

//   resetThenSet = (id, key) => {
//     let temp = JSON.parse(JSON.stringify(this.state[key]));
//     temp.forEach(item => (item.selected = false));
//     temp[id].selected = true;
//     this.setState({
//       [key]: temp
//     });
//   };

//   render() {
//     return (
//       <div className="Dropdown">
//         <p>Dropdown menu examples</p>

//         <div className="wrapper">
//           <DropdownList
//             title="Select fruit"
//             list={this.state.fruit}
//             resetThenSet={this.resetThenSet}
//           />
//         </div>
//       </div>
//     );
//   }
// }
