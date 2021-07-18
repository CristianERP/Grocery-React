import { CLEAR_ITEMS, CLEAR_MESSAGE, EDIT_ITEM, REMOVE_ITEM, SET_INPUT, SUBMIT_EDIT_ITEM, SUBMIT_ITEM } from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case EDIT_ITEM:
            let itemValue = state.items.find((item) => item.id === action.payload)
            return {...state, edit: true, input: itemValue.name, id: action.payload};
        case REMOVE_ITEM:
            let newList = state.items.filter((item) => item.id !== action.payload )
            return {
                ...state,
                items: newList,
                validation: 'incorrect',
                message: 'Item Removed'
            }
        case CLEAR_ITEMS:
            return {
                ...state,
                items: [],
                validation: 'incorrect',
                message: 'Empty List',
                input: ''
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                validation: '',
                message: ''
            }
        case SUBMIT_ITEM:
            let name = state.input;
            let newName = name.charAt(0).toUpperCase().concat(name.slice(1));
            let newArr = state.items.concat({id: Date.now(), name: newName})
            if(state.input.length > 0){    
                return {
                    ...state,
                    input: '',
                    items: newArr,
                    validation: 'correct',
                    message: 'Item Added',
                }
              } else{
                  return{
                    ...state,
                    validation: 'incorrect',
                    message: 'Empty Input'
                  }
              }
        case SUBMIT_EDIT_ITEM:
            let editName = state.input;
            editName = editName.charAt(0).toUpperCase() + editName.slice(1);

            if(state.input.length > 0){
                let newList = state.items.map((item) => {
                  if(item.id === state.id){
                    return {...item, name: editName}
                  }
                  return item
                });
                return {
                    ...state,
                    input: '',
                    edit: false,
                    items: newList,
                    validation: 'correct',
                    message: 'Item Changed'
                }

              }
              else{
                  return{
                    ...state,
                    validation: 'inicorrect',
                    message: 'Empty Input'
                  }
              }
        case SET_INPUT:
            return {
                ...state,
                input: action.payload
            }
        default:
            return state;
    }
}

export default reducer;