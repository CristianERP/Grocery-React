const Button = ({items, clearItems}) => {
    return ( 
        <button className={items.length > 0 ? 'clear visible': 'clear'} onClick={clearItems}>Clear Items</button>
     );
}
 
export default Button;