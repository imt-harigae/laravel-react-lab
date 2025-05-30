import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './pages/TodoList';
import TodoEdit from './pages/TodoEdit';
import Tailwind from './pages/Tailwind';

function App() {
  return (
    <Router>
      <Routes>
        {/* Todoリストのページ */}
        <Route path="/" element={<TodoList />} />
        {/* Todo編集のページ */}
        <Route path="/edit/:id" element={<TodoEdit />} />

        {/* Tailwind動作確認用のページ */}
        <Route path="/tailwind" element={<Tailwind />} />
      </Routes>
    </Router>
  );
}

export default App;