const ModifyList = (props) => {

    const {text, inputHandler, addHandler} = props
    return (
        <div className="modify_container">
            <textarea 
                type="text"
                cols="30"
                rows="1"
                value={text}
                onChange={inputHandler}
                placeholder="Type Here!"
            >
            </textarea>
            <button type="button" className="add_button" onClick={addHandler} >Add</button>
        </div>
    )
}

export default ModifyList;