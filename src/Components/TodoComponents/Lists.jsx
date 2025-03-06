import List from './List.jsx'
import ModifyList from './ModifyList.jsx'
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'

const Lists = () => {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("")
    const [lists, setLists] = useState([])
    const [error, setError] = useState("");

    const inputTextHandler = (e) => {
        setValue(e.target.value);
    }

    const deleteHandler = (id) => {
        if (lists.length < 15) {
            setError("")
        }
        const updateLists = lists.filter((listItem) => (listItem.id !== id))
        setLists(updateLists);
    }
    const addHandler = () => {
        if (lists.length < 15) {
            setLists((prevState) => [
                ...prevState,
                {
                    id: uuid(),
                    text: value
                }
            ]
        

            )
        } else {
            setError ("待办事项数量不能超过15！")
        }
        setValue("")
    }


    useEffect (()=> {
        const data = JSON.parse(localStorage.getItem('Lists'));
        if (Array.isArray(data) && data.length > 0) {
            setLists(data)
        }
        setLoading(false);
    },[])

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('Lists', JSON.stringify(lists));
        }
    },[loading, lists])
    
    return (
        <div className="lists_container">
            {/* 使用一个 ul 容器包裹所有的列表项 */}
            <ul className="list_container">
                {lists.map((listItem) => (
    
                    <List
                        key={listItem.id}
                        id={listItem.id}
                        text={listItem.text}
                        deleteHandler={deleteHandler}
                        error={error}
                    />
                ))}
            </ul>

            {error && <p className="error">{error}</p>}
            {/* ModifyList 组件：提供输入框和添加按钮 */}
            <ModifyList
                value={value}
                addHandler={addHandler}
                inputTextHandler={inputTextHandler}
                deleteHandler={deleteHandler}
            />
            
        </div>
    );
}

export default Lists;
