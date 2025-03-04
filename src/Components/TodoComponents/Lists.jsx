import List from './List.jsx'
import ModifyList from './ModifyList.jsx'
import { useState, useEffect } from 'react';
import {v4 as uuid} from 'uuid'

const Lists = () => {
    const [lists, setlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");

    const inputHandler = (e) => {
        setInputText(e.target.value)
    }
    const addHandler = () => {
        setlists((prevState) => [
            ...prevState,
            {
                id: uuid(),
                text: inputText,
            }
        ])
    }

    const deleteHandler = (id) => {
        const deleteList = lists.filter((lists) => lists.id !== id)
        setlists(deleteList)
    }

    useEffect (()=>{
        const data = JSON.parse(localStorage.getItem('Lists'));
        if (Array.isArray(data) && data.length > 0) {
           setlists(data);
        }
        setLoading(false);
        
    },[])

    useEffect (() => {
        if (!loading) {
            localStorage.setItem('Lists', JSON.stringify(lists))
        }
    },[lists, loading])
    
    return (
        <div className="lists_container">
            <ul className="list_container">
                {lists.map((listItem) => (
                    <List
                        key={listItem.id}
                        id={listItem.id}
                        text={listItem.text}
                        deleteHandler={deleteHandler}
                    />
                ))}
            </ul>
            <ModifyList
                inputHandler = {inputHandler}
                addHandler = {addHandler}
                inputText = {inputText}
            />
        </div>
    )
}

export default Lists;