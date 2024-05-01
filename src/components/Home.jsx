import React, { useEffect, useState, useRef } from "react";
import ListofTodo from "./ListofTodo";

function Home() {
    const [inputValue, setInputValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const textareaRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [editText, setEditText] = useState({});
    const [todos, setTodos] = useState(() => {
        const taskList = localStorage.getItem('task');
        return taskList ? JSON.parse(taskList) : [];
    });

    function handleSubmit(event) {
        event.preventDefault();
        if (editMode) {
            // Update existing todo
            const updatedTodos = todos.map(todo => {
                if (todo.id === editText.id) {
                    return { ...todo, title: inputValue, summary: textAreaValue };
                }
                return todo;
            });
            setTodos(updatedTodos);
            setEditMode(false);
        } else {
            // Add new todo
            if (inputValue.trim() !== '' && textAreaValue.trim() !== '') {
                const id = todos.length;
                const currentTime = new Date();
                const seconds = currentTime.getSeconds();
                const hour = currentTime.getHours();
                const minutes = currentTime.getMinutes();
                const newTask = { id: id, title: inputValue, summary: textAreaValue, time: { hour: hour, minutes: minutes, seconds: seconds } };
                setTodos(prevTodos => [...prevTodos, newTask]);
            }
        }
        setInputValue('');
        setTextAreaValue('');
    }

    function removeTodo(id) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('task', JSON.stringify(updatedTodos));
    }

    function editFunction(task) {
        setEditMode(true);
        setEditText(task);
        setInputValue(task.title);
        setTextAreaValue(task.summary);
    }

    useEffect(() => {
        const resizeTextArea = () => {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            const textScrollHeight = textarea.scrollHeight;
            const textScrollTop = textarea.scrollTop;
            textarea.style.height = textScrollHeight - textScrollTop + 'px';
        };

        const handleInput = () => {
            resizeTextArea();
        };

        textareaRef.current.addEventListener('input', handleInput);

        return () => {
            textareaRef.current.removeEventListener('input', handleInput);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(todos));
    }, [todos]);

    return (
        <div>
            <h1 className="w-fit p-2 mx-auto text-5xl font-bold mt-2 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-slate-400"> My Todo</h1>
            <form className="flex flex-col gap-4 mx-40 my-20" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border border-black placeholder:text-slate-500 mx-auto w-96 rounded-md py-2 px-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Task Title"
                    name="title"
                />
                <textarea
                    ref={textareaRef}
                    className="border border-black placeholder:text-slate-500 resize-none overflow-hidden mx-auto w-96 px-2 rounded-md py-2"
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    name="summary"
                    cols="30"
                    rows="1"
                    placeholder="Todo description"
                />
                {!editMode ?
                    <button className="border rounded-md bg-red-500 text-white w-96 mx-auto py-2">
                        {editMode ? 'Save' : 'Submit'}
                    </button>
                    :
                    <>
                        <button className="border rounded-md bg-red-500 text-white w-96 mx-auto py-2">
                           Save
                        </button>
                        <button onClick={() => editMode(false)} className="border rounded-md bg-red-500 text-white w-96 mx-auto py-2">
                           Back
                        </button>
                    </>
                }
            </form>
            {todos.slice(0).reverse().map((task) => (
                !editMode ?
                    <div className="w-96 mx-auto overflow-hidden text-justify break-words" key={task.id}>
                        <ul className="bg-slate-300 rounded p-5 my-10">
                            <ListofTodo list={task} />
                            <div className="flex justify-around mt-5">
                                <button
                                    onClick={() => editFunction(task)}
                                    className="bg-red-600 text-white p-2 w-fit rounded-md mt-4 flex items-center transition-transform duration-300 ease-in-out active:scale-90 active:bg-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                </button>
                                <button
                                    onClick={() => removeTodo(task.id)}
                                    className="bg-red-600 text-white p-2 w-fit rounded-md mt-4 flex items-center transition-transform duration-300 ease-in-out active:scale-90 active:bg-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </button>
                            </div>
                        </ul>
                    </div>
                    :
                    null
            ))}
        </div>
    );
}

export default Home;
