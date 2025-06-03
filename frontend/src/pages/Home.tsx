// src/pages/Home.tsx
import { Link } from 'react-router-dom'

export default function Home () {
    const features = [
        { title: 'タスク管理', desc: '日々のToDoを簡単に追加・編集・削除できます。' },
        { title: '本の管理', desc: '本の一覧や詳細情報をモーダルで確認できます。' },
        { title: 'UI確認', desc: 'Tailwindのレイアウト確認・練習ページもあります。' },
    ];

    const roadmap = [
        { title: 'ユーザー認証', desc: 'ログイン・新規登録機能を追加し、ユーザーごとのデータ管理を可能に。'},
        { title: 'カテゴリ機能', desc: 'Todoや本にタグやカテゴリを設定し、整理しやすくします。'},
        { title: 'モバイル最適化', desc: 'スマホでの操作性向上のため、レスポンシブデザインを強化。'},
    ];

    return (
        <main className="bg-gray-50 text-gray-800 dark:bg-neutral-900 dark:text-white">
            {/* Hero */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">ようこそ！</h1>
                <p className="text-lg mb-6">このサイトではTodoや本の管理、Tailwindの確認ができます。</p>
                <div className="flex gap-4">
                    <Link to="/todos" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Todoを開く</Link>
                    <Link to="/books" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Bookを開く</Link>
                    <Link to="/tailwind" className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">Tailwindの動作確認</Link>
                </div>
            </section>

            {/* Features */}
            <section className="bg-white dark:bg-neutral-900 py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">機能紹介</h2>
                    <p className="text-lg text-gray-600 dark:text-neutral-300 mb-8">このサイトではTodoや本の管理、Tailwindの確認ができます。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
                        {features.map((f, i) => (
                            <div key={i} className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-neutral-300">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="bg-white dark:bg-neutral-900 py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">今後のアップデート予定</h2>
                    <p className="text-lg text-gray-600 dark:text-neutral-300 mb-8">このサイトは現在も開発中です。以下のような機能を順次追加予定です。</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
                        {roadmap.map((f, i) => (
                            <div key={i} className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-neutral-300">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
