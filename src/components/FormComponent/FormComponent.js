import React from 'react'

const FormComponent = ({ handleInput, handleSubmit, input, edit }) => {
  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="e.g eggs"
        value={input}
        onChange={handleInput}
      />
      <button className="submit">{edit ? 'Edit' : 'Submit'}</button>
    </form>
  )
}

export default FormComponent
