import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import TodoEdit from './pages/TodoEdit';
import Tailwind from './pages/Tailwind';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Todo */}
          <Route path="/todos" element={<TodoList />} />
          <Route path="/edit/:id" element={<TodoEdit />} />

          {/* Tailwind */}
          <Route path="/tailwind" element={<Tailwind />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
