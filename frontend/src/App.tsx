import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TodoList from './pages/TodoList';
import TodoEdit from './pages/TodoEdit';
import Tailwind from './pages/Tailwind';
import BookList from './pages/BookList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/edit/:id" element={<TodoEdit />} />
          <Route path="/tailwind" element={<Tailwind />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
