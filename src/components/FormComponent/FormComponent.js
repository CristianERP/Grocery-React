import React from 'react';

const FormComponent = ({handleInput, handleSubmit, input, edit}) => {
    return ( 
        <div className="input-group">
            <input type="text" placeholder="e.g eggs" value={input} onChange={handleInput}/>
            <button className="submit" onClick={handleSubmit}>{edit ? 'Edit': 'Submit'}</button>
        </div>
     );
}
 
export default FormComponent;