import React, { Component, useState, useEffect, useReducer } from "react";
import axios from "axios";
import DropdownList from "./DropdownList";

import styled from "styled-components";

const Dropdown = props => {
  const reqUrl = "https://fitmetrix.herokuapp.com/api/category/user/";

  const initialCategoryValue = [" --- Select a Category --- "];

  const [categorys, setCategorys] = useState(initialCategoryValue);

  let categoryComponent = null;

  // useEffect to get Categories
  useEffect(() => {
    console.log("Inside effect 1");
    const token = window.localStorage.getItem("login_token");
    axios
      .get(reqUrl, {
        headers: {
          Authorization: token
        }
      })
      .then(result =>
        // console.log("result.data is: ", result.data)
        result.data.map(res => {
          console.log("result.data.map response is: ", res);
          initialCategoryValue.push(res.category);
          return setCategorys(initialCategoryValue);
        })
      );
  }, []);

  categoryComponent = (
    <select>
      {categorys.map((category, index) => (
        <option key={index}>{category}</option>
      ))}
    </select>
  );

  console.log("Inside WorkoutView - Dropdown.js");

  return (
    <div>
      <label>Category:</label>
      {categoryComponent}
    </div>
  );
};

export default Dropdown;

// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";
// import StateSelector from "./StateSelector";
// import Footer from "./Footer";

// const SelectTesting = () => {
//   const reqUrl = "https://hn.algolia.com/api/v1/search?query=redux";

//   const initialStateValue = [{ id: 0, value: " --- Select A State --- " }];
//   const initialAuthorValue = [" --- Select an Author --- "];

//   const allowedState = [
//     { id: 1, value: "Alabama" },
//     { id: 2, value: "Georgia" },
//     { id: 3, value: "Missisippi" }
//   ];

//   const [authors, setAuthors] = useState(initialAuthorValue);
//   const [allStates, setAllSelected] = useState(initialStateValue);
//   const [stateSelected, setStateSelected] = useState(
//     initialStateValue[0].value
//   );

//   let authorComponent = null;

//   // useEffect to get states
//   useEffect(() => {
//     console.log("Inside effect");
//     const stateValues = initialStateValue;
//     allowedState.map(sel => {
//       stateValues.push(sel);
//       return setAllSelected(stateValues);
//     });
//   }, []);

//   // useEffect to get Authors
//   useEffect(() => {
//     console.log("Inside effect 2");
//     axios(reqUrl).then(result =>
//       result.data.hits.map(res => {
//         initialAuthorValue.push(res.author);
//         return setAuthors(initialAuthorValue);
//       })
//     );
//   }, []);

//   authorComponent = (
//     <select>
//       {authors.map((author, index) => (
//         <option key={index}>{author}</option>
//       ))}
//     </select>
//   );

//   const stateSelectionHandler = event => {
//     const value = event.target.value;
//     console.log(allStates);
//     const stateIndex = allStates.findIndex(state => state.value === value);
//     console.log(event.target.value, allStates, "index:", stateIndex);
//     setStateSelected(event.target.value);
//   };

//   const resetClickHandler = () => {
//     console.log("reset was clicked");
//     setStateSelected(initialStateValue[0].value);
//   };

//   console.log("Inside Index.js Main");

//   return (
//     <div>
//       <hr />
//       <StateSelector
//         selectedState={stateSelected}
//         allStates={allStates}
//         onStateSelection={stateSelectionHandler}
//       />
//       <hr />
//       <label>Author:</label>
//       {authorComponent}
//       <hr />
//       <Footer onResetClick={resetClickHandler} />
//     </div>
//   );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<SelectTesting />, rootElement);
