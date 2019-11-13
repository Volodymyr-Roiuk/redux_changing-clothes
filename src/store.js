import { createStore } from 'redux';

const clotheList = ['Apron', 'Belt', 'Cardigan', 'Dress', 'Earrings', 'Fur coat', 'Gloves', 'Hat']
  .map((name, i) => ({ id: i + 1, name , editing: false }));

// action types
const TYPE_EDIT_CLICK = 'editClick';
const CHANGE_EDIT_VALUE = 'changeEditValue';
const KEY_PRESS = 'keyPress';


//action creators
export const editClick = currentId => ({ type: TYPE_EDIT_CLICK, currentId });
export const changeEditValue = value => ({ type: CHANGE_EDIT_VALUE, value });
export const keyPress = keyCode => ({ type: KEY_PRESS, keyCode });


// selectors
export const getClotheList = state => state.clotheList;
export const getEditValue = state => state.editValue;

const reducer = (state, action) => {
  switch (action.type) {
    case TYPE_EDIT_CLICK:
      const currentItem = state.clotheList.find(item => item.id === action.currentId);

      return ({
        ...state,
        prevEditValue: currentItem.name,
        editValue: currentItem.name,
        currentId: action.currentId,
        clotheList: state.clotheList.map(item => ({...item, editing: item.id === action.currentId })),
      });
    case CHANGE_EDIT_VALUE: {
      return ({ ...state, editValue: action.value })
    }
    case KEY_PRESS: {
      switch (action.keyCode) {
        case 'Enter': {
          const currentItem = state.clotheList.find(item => item.id === state.currentId);

          if (!currentItem) return { ...state };

          currentItem.name = state.editValue;
          currentItem.editing = false;;

          return ({ ...state, editValue: '' });
        }
        case 'Escape': {
          const currentItem = state.clotheList.find(item => item.id === state.currentId);

          if (!currentItem) return { ...state };

          currentItem.name = state.prevEditValue;
          currentItem.editing = false;

          return ({ ...state, editValue: '' });
        }
      }
    }
    default:
      return state;
  }
};

const store = createStore(reducer, { clotheList, currentId: null, editValue: '', prevEditValue: '' });

export default store;

