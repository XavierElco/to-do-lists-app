 const List = ({id, text, deleteHandler}) => {
    
    return (
            <li className="list">
                <div className="left-part">
                    <input type="checkbox" className="checkbox"  onClick={()=>deleteHandler(id)}/>
                    <span className="text">{text}</span>
                </div>
                <button type="button" className="delete_button" onClick={()=>deleteHandler(id)}>delete</button>
            </li>
    )
}

export default List;