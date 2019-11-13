import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { Button, Input } from 'semantic-ui-react'

import { getClotheList, getEditValue, editClick, changeEditValue, keyPress } from '../../store';


const ClotheList = ({ clotheList, editValue, editClick, changeEditValue, keyPress }) => {

  const onEditClick = (event) => {
    editClick(Number(event.target.dataset.id));
  };

  const onEditValueChange = (event) => {
    changeEditValue(event.target.value);
  };

  const buttonPress = (event) => {
    keyPress(event.key);
  };

  useEffect(() => {
    document.addEventListener('keydown', buttonPress);

    return () => document.removeEventListener('keydown', buttonPress);
  }, []);

  return (
    <div className="clotheList">
      <ul>
        {clotheList.map(item =>
          item.editing ? (
            <Input
              key={item.id}
              placeholder='Edit...'
              onChange={onEditValueChange}
              value={editValue}
            />
          ) : (
            <li key={item.id}>
              {item.name}
              <Button data-id={item.id} onClick={onEditClick}>Edit</Button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

const getDate = state => ({
  clotheList: getClotheList(state),
  editValue: getEditValue(state),
});

const getMethods = dispatch => ({
  editClick: id => dispatch(editClick(id)),
  changeEditValue: value => dispatch(changeEditValue(value)),
  keyPress: keyCode => dispatch(keyPress(keyCode)),
});



export default connect(
  getDate,
  getMethods,
)(ClotheList);
