import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
