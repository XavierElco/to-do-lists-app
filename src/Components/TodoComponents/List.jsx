 const List = (props) => {
    
   const {id, text, deleteHandler} = props
    return (
        
            <li className="list">
                
                <div className="left-part">
                    <input type="checkbox" className="checkbox"/>
                    <span className="text">{text}</span>

                </div>
                <button type="button" className="delete_button" onClick={() => deleteHandler(id)}>delete</button>
            </li>
    )
}

export default List;