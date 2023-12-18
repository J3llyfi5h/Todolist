import React, { useState, useEffect, useCallback } from 'react';
import TodoItem from './TodoItem';
function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(() => {
    if (input.trim() !== '') {
      setTodos([...todos, input]);
      setInput('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a task');
    }
  }, [todos, input]);

  const deleteTodo = useCallback((index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }, [todos]);

  const editTodo = useCallback((index) => {
    setEditMode(true);
    setEditIndex(index);
  }, []);

  const updateTodo = useCallback((index, value) => {
    if (value.trim() !== '') {
      const newTodos = [...todos];
      newTodos[index] = value;
      setTodos(newTodos);
      setEditMode(false);
      setEditIndex(null);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a task');
    }
  }, [todos]);

  const cancelEdit = useCallback(() => {
    setEditMode(false);
    setEditIndex(null);
  }, []);

  return (
    <div className="App flex justify-center mt-8">
      <div>
        <h1 className='text-3xl text-center'>Todo List</h1>
        <input
          type="text"
          placeholder=" Add a new task"
          value={input}
          className='border-2 py-1 w-[380px] mt-4'
          onChange={e => setInput(e.target.value)}
        />
        <button className='ml-2 px-4 py-1 border-2 rounded-md bg-green-400' onClick={addTodo}>Add</button>
        <p>{errorMessage}</p>
        <div className='mt-8 flex flex-col gap-1'>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              editMode={editMode}
              editIndex={editIndex}
              onEdit={editTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onCancel={cancelEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;