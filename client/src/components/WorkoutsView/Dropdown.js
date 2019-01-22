import React, { Component, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import DropdownList from './DropdownList';

import styled from 'styled-components';

const Dropdown = props => {
  const key = window.localStorage.getItem('login_token');

  const reqUrl = 'https://fitmetrix.herokuapp.com/api/category/user';

  const initialCategoryValue = [' --- Select an Category --- '];

  const [categories, setCategory] = useState(initialCategoryValue);

  let categoryComponent = null;

  // useEffect to get Categories
  useEffect(() => {
    console.log('Inside effect 2');
    axios.get(reqUrl, { headers: { Authorization: key } }).then(result =>
      result.data.map(res => {
        initialCategoryValue.push(res.name);
        return setCategory(initialCategoryValue);
      })
    );
  }, []);

  categoryComponent = (
    <select>
      {categories.map((category, index) => (
        <option key={index}>{category}</option>
      ))}
    </select>
  );

  return (
    <div>
      <label>Category::</label>
      {categoryComponent}
      <hr />
    </div>
  );
};

export default Dropdown;
