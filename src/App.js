import './App.css'
import React, { useEffect, useReducer } from 'react'

import FormComponent from './components/FormComponent/FormComponent'
import ListItem from './components/ListItem/ListItem'
import Messages from './components/Messages/Messages'
import Button from './components/Button/Button'

import reducer from './reducer'
import {
  CLEAR_ITEMS,
  CLEAR_MESSAGE,
  EDIT_ITEM,
  REMOVE_ITEM,
  SET_INPUT,
  SUBMIT_EDIT_ITEM,
  SUBMIT_ITEM,
} from './actions'

const getItems = () => {
  return localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : []
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    input: '',
    items: getItems(),
    message: '',
    validation: '',
    edit: '',
    id: '',
  })

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state.items))
  }, [state.items])

  const editItem = (id) => {
    dispatch({ type: EDIT_ITEM, payload: id })
  }

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id })
    setTimeout(() => clearMessage(), 2000)
  }

  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS })
    setTimeout(() => clearMessage(), 2000)
  }

  const handleInput = (e) => {
    dispatch({ type: SET_INPUT, payload: e.target.value })
  }

  const clearMessage = () => {
    dispatch({ type: CLEAR_MESSAGE })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!state.edit) {
      dispatch({ type: SUBMIT_ITEM })
    } else {
      dispatch({ type: SUBMIT_EDIT_ITEM })
    }
    setTimeout(() => clearMessage(), 2000)
  }

  const { validation, message, input, edit, items } = state
  return (
    <div className="container">
      <div className="content">
        <Messages validation={validation} message={message} />
        <h1>Grocery Bag</h1>
        <FormComponent
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          input={input}
          edit={edit}
        />
        <ListItem items={items} editItem={editItem} removeItem={removeItem} />
        <Button items={items} clearItems={clearItems} />
      </div>
    </div>
  )
}

export default App
