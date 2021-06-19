
import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      items: localStorage.getItem('items') == null ? []: localStorage.getItem('items') === ''? [] : localStorage.getItem('items').split(','),
      message: '',
      validation: '',
      edit: false,
      id: ''
    }
    

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.keyPress	= this.keyPress.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentDidMount(){
    document.addEventListener('keydown', this.keyPress)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.keyPress)
  }

  editItem(e, id){
    let idItem = id;
    this.setState({
      edit: true,
      input: this.state.items[idItem],
      id: idItem
    })
  }

  removeItem(e, id){
    let idItem = id; 
    let newList = this.state.items.filter((item, i) => i !== idItem )
    localStorage.setItem('items', newList);
    
    this.setState({
      items: localStorage.getItem('items') == null ? []: localStorage.getItem('items') === '' ? [] : localStorage.getItem('items').split(','),
      validation: 'incorrect',
      message: 'Item Removed'
    })

    setTimeout(() => this.resetMessage(), 2000);
  }

  keyPress(e){
    if(e.key === 'Enter'){
      this.handleSubmit();
    }
  }
  clearItems(){
    localStorage.clear()
    this.setState({
      items: localStorage.getItem('items') == null ? []: localStorage.getItem('items').split(','),
      validation: 'incorrect',
      message: 'Empty List',
      input: ''
    })
    setTimeout(() => this.resetMessage(), 2000);
  }
  resetMessage(){
    this.setState({
      validation: ''
    })
  }
  handleInput(e){
    this.setState({
      input: e.target.value
    })
  }

  handleSubmit(){
    let name = this.state.input;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    if(!this.state.edit){
      if(this.state.input.length > 0){
        localStorage.setItem('items', this.state.items.concat(name))
        this.setState({
          input: '',
          items: localStorage.getItem('items').split(','),
          validation: 'correct',
          message: 'Item Added'
        })
        setTimeout(() => this.resetMessage(),2000);
      } else{
        this.setState({
          validation: 'incorrect',
          message: 'Empty Input'
        })
        setTimeout(() => this.resetMessage(),2000);
      }
    } else{
      if(this.state.input.length > 0){
        let newList = this.state.items.map((item, i) => {
          if(i === this.state.id){
            return name
          }
          return item
        });
        localStorage.setItem('items', newList)
        this.setState({
          input: '',
          edit: false,
          items: localStorage.getItem('items').split(','),
          validation: 'correct',
          message: 'Item Changed'
        })
        setTimeout(() => this.resetMessage(),2000);
      }
      else{
        this.setState({
          validation: 'incorrect',
          message: 'Empty Input'
        })
        setTimeout(() => this.resetMessage(),2000);
      }
    }
  }
  render(){
    let items = this.state.items.map((item, i) =>{
      return(
      <div className="list" key={i} id={i}>
            <div className="item">{item}</div>
            <div className="icons">
              <FontAwesomeIcon icon={faEdit} className="edit" onClick={(e) => this.editItem(e,i)}/>
              <FontAwesomeIcon icon={faTrashAlt} className="delete" onClick={(e) => this.removeItem(e ,i)}/> 
            </div>
      </div>
      )
    });
    return (
      <div className="container">
        <div className="content">
          <p className={this.state.validation === 'correct' ? 'message green': this.state.validation === 'incorrect'? 'message red': 'message'}>{this.state.message}</p>
          <h1>grocery bud</h1>
          <div className="input-group">
            <input type="text" placeholder="e.g eggs" value={this.state.input} onChange={this.handleInput}/>
            <button className="submit" onClick={this.handleSubmit}>{this.state.edit ? 'Edit': 'Submit'}</button>
          </div>
          {items}
          <button className={this.state.items.length > 0 ? 'clear visible': 'clear'} onClick={this.clearItems}>Clear Items</button>
        </div>
      </div>
    );
  }
}

export default App;
