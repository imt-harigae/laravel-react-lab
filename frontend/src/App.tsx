// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import TodoEdit from './pages/TodoEdit';
import Tailwind from './pages/Tailwind';
import BookList from './pages/BookList';
import BuilderPage from './pages/BuilderPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Todo */}
          <Route path="/todos" element={<TodoList />} />
          <Route path="/edit/:id" element={<TodoEdit />} />

          {/* Book */}
          <Route path="/books" element={<BookList />} />

          {/* Tailwind */}
          <Route path="/tailwind" element={<Tailwind />} />

          {/* Builder */}
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}