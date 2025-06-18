import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  // State to store todos and new todo input
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all todos of the logged-in user
  const fetchTodos = async () => {
    try {
      const response = await api.get('todos/');
      setTodos(response.data);
    } catch (err) {
      console.error("Fetch failed", err);
      navigate('/login'); // Token invalid → redirect
    }
  };

  // Called once on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, []);

  // Handle new todo submission
  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('todos/', {
        title,
        completed: false,
      });

      setTodos([...todos, response.data]); // Add new todo to list
      setTitle(''); // Clear input field
      setError('');
    } catch (err) {
      console.error("Add failed", err);
      setError('Could not add todo');
    }
  };

  const handleDelete = async(id) => {
    try{
      await api.delete(`todos/${id}/`);
      setTodos(todos.filter((todo) => todo.id != id));
    }catch(err){
      console.error("Delete failed", err);
      setError('could not delete todos')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">My Todos</h1>

      {/* Form to Add a New Todo */}
      <form onSubmit={handleAddTodo} className="max-w-xl mx-auto mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter todo..."
          className="flex-grow px-4 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* List of Todos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">No todos found.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-semibold">{todo.title}</h2>
              <p className={`mt-2 ${todo.completed ? 'text-green-600' : 'text-red-500'}`}>
                {todo.completed ? 'Completed' : 'Incomplete'}
              </p>
              <button onClick={() => handleDelete(todo.id)}
                className="border border-black-500 rounded-lg shadow-lg px-2 py-1 mt-2 hover:bg-black hover:text-white hover:rounded-full cursor-pointer" >
                 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoPage;
