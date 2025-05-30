import { useState } from 'react';

function Tailwind() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Tailwind Test Page
      </h1>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => setCount(count + 1)}
      >
        count is {count}
      </button>

      <p className="mt-4 text-gray-700">
        Tailwindが適用されていれば、背景・ボタン色・文字サイズなどに変化があります。
      </p>
    </div>
  );
}

export default Tailwind;

