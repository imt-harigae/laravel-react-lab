import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: number;
}

interface Props {
  todoId: number;
  onClose: () => void;
  onUpdated: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditTodoForm: React.FC<Props> = ({ todoId, onClose, onUpdated }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    axios.get(`${API_BASE_URL}/todos/${todoId}`).then(res => {
      setTodo(res.data.data);
    });
  }, [todoId]);

  const handleUpdate = () => {
    if (!todo) return;

    axios.put(`${API_BASE_URL}/todos/${todoId}`, todo)
      .then(() => {
        onUpdated();
        onClose();
      })
      .catch(err => {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        }
      });
  };

  if (!todo) return <p>読み込み中...</p>;

  return (
    <div className="form-section">
      <div className="form-group">
        <label>タイトル：</label>
        <input
          type="text"
          value={todo.title}
          onChange={e => setTodo({ ...todo, title: e.target.value })}
          className="input-text"
        />
        {errors.title && <div className="error-text">{errors.title.join(', ')}</div>}
      </div>

      <div className="form-group">
        <label>説明：</label>
        <textarea
          value={todo.description || ''}
          onChange={e => setTodo({ ...todo, description: e.target.value })}
          className="textarea-text"
        />
        {errors.description && <div className="error-text">{errors.description.join(', ')}</div>}
      </div>

      <div className="status-buttons">
        {[0, 1, 2].map(s => {
          const isActive = todo.status === s;
          return (
            <button
              key={s}
              onClick={() => setTodo({ ...todo, status: s })}
              className={`status-button ${
                isActive
                  ? ['status-active-not-started', 'status-active-in-progress', 'status-active-done'][s]
                  : 'status-inactive'
              }`}
            >
              {['未着手', '進行中', '完了'][s]}
            </button>
          );
        })}
      </div>

      <div className="form-actions">
        <button className="btn-primary" onClick={handleUpdate}>💾 保存</button>
        <button className="btn-secondary" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default EditTodoForm;
