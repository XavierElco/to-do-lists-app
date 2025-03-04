import List from './List.jsx'
import ModifyList from './ModifyList.jsx'
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'

/*
  Lists 组件：
  - 负责管理整个待办事项列表。
  - 渲染所有待办事项（通过 List 组件）和输入修改区域（通过 ModifyList 组件）。
*/
const Lists = () => {
    // lists：存储所有待办事项的数组，每个事项包含 id 和 text。
    const [lists, setlists] = useState([]);
    // loading：表示是否正在加载本地存储的数据。
    const [loading, setLoading] = useState(true);
    // inputText：保存输入框中的文本内容，用于添加新的待办事项。
    const [inputText, setInputText] = useState("");

    // inputHandler: 处理输入框变化事件，将输入的内容存入 inputText 状态。
    const inputHandler = (e) => {
        setInputText(e.target.value);
    }

    // addHandler: 将当前输入框的内容作为一个新待办事项添加到 lists 数组中。
    // 使用 uuid 生成唯一 id，并保留之前已有的待办事项。
    const addHandler = () => {
        setlists((prevState) => [
            ...prevState, // 展开之前的事项
            {
                id: uuid(),     // 生成一个唯一 id
                text: inputText // 当前输入的文本
            }
        ]);
    }

    // deleteHandler: 根据传入的 id 删除对应的待办事项
    // 通过过滤掉 id 匹配的事项来实现删除。
    const deleteHandler = (id) => {
        const deleteList = lists.filter((listItem) => listItem.id !== id);
        setlists(deleteList);
    }

    // useEffect：组件挂载时执行
    // 从 localStorage 中读取之前存储的待办事项（JSON 格式），
    // 如果存在且为有效数组，则更新 lists 状态；同时设置 loading 为 false。
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Lists'));
        if (Array.isArray(data) && data.length > 0) {
           setlists(data);
        }
        setLoading(false);
    }, []);

    // useEffect：当 lists 状态（或 loading 状态）变化时执行
    // 当加载完成后，将最新的 lists 数据存入 localStorage（以 JSON 格式）。
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('Lists', JSON.stringify(lists));
        }
    }, [lists, loading]);
    
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
                    />
                ))}
            </ul>
            {/* ModifyList 组件：提供输入框和添加按钮 */}
            <ModifyList
                inputHandler={inputHandler}
                addHandler={addHandler}
                inputText={inputText}
            />
        </div>
    );
}

export default Lists;
