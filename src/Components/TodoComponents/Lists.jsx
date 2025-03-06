import List from './List.jsx'
import ModifyList from './ModifyList.jsx'
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'

const Lists = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState("")
    const [lists, setLists] = useState([])

    const inputHandler = (e) => {
        setText(e.target.value)
    };

    const addHandler = () => {
        
        if (lists.length < 15) {
            setLists((prevState) => [
                ...prevState,
                {
                    id: uuid(),
                    text: text
                }
            ]
        

            )
        } else {
            setError ("待办事项数量不能超过15！")
        }
        setText("")
    }


    const deleteHandler = (id) => {
        if (lists.length <= 15) {
            setError("")
        }
        const newLists = lists.filter((item) => item.id !== id);
        setLists(newLists)
    }
   
    useEffect (() => {
        const data = JSON.parse(localStorage.getItem('Lists'))
        if (Array.isArray(data) && data.length > 0) {
            setLists(data);
        }
        setLoading(false);
    },[])

    useEffect(() => {
        if (!false) {
            localStorage.setItem("Lists", JSON.stringify(lists))
        }
    },[loading, lists])

    return (
        <div className="lists_container">
            {/* 使用一个 ul 容器包裹所有的列表项 */}
            <ul className="list_container">
                {lists.map((item) => (
                    <List
                        
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        deleteHandler={deleteHandler}
                    />
                ))}
            </ul>

            {error && <p className="error">{error}</p>}
            {/* ModifyList 组件：提供输入框和添加按钮 */}
            <ModifyList
               text={text}
               inputHandler={inputHandler}
               addHandler={addHandler}
            />
            
        </div>
    );
}

export default Lists;
