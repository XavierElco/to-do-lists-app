const ModifyList = (props) => {

    const {value, addHandler, inputTextHandler} = props
    return (
        <div className="modify_container">
            <textarea 
                type="text"
                cols="30"
                rows="1"
                value={value}
                onChange={inputTextHandler}
                placeholder="Type Here!"
            >
            </textarea>
            <button type="button" className="add_button" onClick={addHandler} >Add</button>
        </div>
    )
}

export default ModifyList;