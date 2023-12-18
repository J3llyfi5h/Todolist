import React, { useState, useEffect, useCallback } from 'react';

export default function TodoItem({ todo, index, editMode, editIndex, onEdit, onDelete, onUpdate, onCancel }) {
    const [input, setInput] = useState(todo);
    const [updateErrorMessage, setUpdateErrorMessage] = useState('');

    useEffect(() => {
        setInput(todo);
    }, [todo]);

    const handleUpdate = () => {
        if (input.trim() !== '') {
            onUpdate(index, input);
            setUpdateErrorMessage('');
        } else {
            setUpdateErrorMessage('Please enter a task');
        }
    };

    return (
        <div key={index} className='flex justify-center'>
            <div className='w-[300px] border-2 text-start'>
                {editMode && editIndex === index ? (
                    <>
                        <input
                            type="text"
                            value={input}
                            className='border-blue-400 border-2 w-[300px] px-2 py-1'
                            onChange={e => setInput(e.target.value)}
                        />
                        <p>{updateErrorMessage}</p>
                    </>
                ) : (
                    <span> &nbsp;{todo}</span>
                )}
            </div>
            {editMode && editIndex === index ? (
                <div>
                    <button onClick={onCancel} className='ml-2 px-3 py-1 border-2 rounded-md bg-red-400' >Cancel</button>
                    <button onClick={handleUpdate} className='px-3 py-1 border-2 rounded-md bg-green-400' >Update</button>
                </div>
            ) : (
                <div className='ml-2'>
                    <button className='px-4 py-1 border-2 rounded-md bg-blue-400' onClick={() => onEdit(index)}>Edit</button>
                    <button className='px-4 py-1 border-2 rounded-md bg-red-400' onClick={() => onDelete(index)}>Delete</button>
                </div>
            )}
        </div>
    );
};