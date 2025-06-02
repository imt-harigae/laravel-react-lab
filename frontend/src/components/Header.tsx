// src/components/Header.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/', label: 'ホーム' },
    { to: '/todos', label: 'Todo' },
    { to: '/books', label: 'Book' },
    { to: '/tailwind', label: 'Tailwind確認' },
];

const navLinkClass = (isActive: boolean) =>
    `font-medium hover:underline ${
        isActive
            ? 'text-blue-500'
            : 'text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'
}`;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="relative bg-white dark:bg-neutral-800 text-sm py-3">
            <nav className="max-w-[85rem] mx-auto px-4 flex flex-wrap sm:flex-nowrap sm:justify-between sm:items-center">
                <div className="flex items-center justify-between w-full sm:w-auto">
                    <a href="/" className="text-xl font-semibold dark:text-white flex items-center gap-x-2">
                        <svg className="w-10 h-auto" viewBox="0 0 100 100" fill="none">
                        <rect width="100" height="100" rx="10" fill="black" />
                        <path d="" fill="white" />
                        </svg>
                        DEMO
                    </a>
                    <button
                        onClick={toggleMenu}
                        className="sm:hidden size-9 flex items-center justify-center rounded-lg border bg-white text-gray-800 dark:bg-transparent dark:border-neutral-700 dark:text-white"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        {isOpen ? (
                        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 6L6 18" />
                            <path d="M6 6L18 18" />
                        </svg>
                        ) : (
                        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                        )}
                    </button>
                </div>

                {/* PC用メニュー */}
                <div className="hidden sm:flex gap-5 items-center">
                    {navItems.map(({ to, label }) => (
                        <NavLink key={to} to={to} className={({ isActive }) => navLinkClass(isActive)}>
                        {label}
                        </NavLink>
                    ))}
                    <button className="font-medium hover:underline text-gray-600 dark:text-neutral-400 dark:hover:text-neutral-500">
                        ログアウト
                    </button>
                </div>
            </nav>

            {/* オーバーレイ */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeMenu}
            />

            {/* モバイルメニュー */}
            <aside
                className={`fixed top-0 right-0 z-50 w-64 h-full bg-white dark:bg-neutral-800 shadow-lg transform transition-transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-end p-4">
                <button
                    onClick={closeMenu}
                    className="p-2 rounded-md border text-gray-800 dark:text-white dark:border-neutral-700"
                    aria-label="Close menu"
                >
                    ×
                </button>
                </div>
                <nav className="flex flex-col gap-5 px-6">
                    {navItems.map(({ to, label }) => (
                        <NavLink
                        key={to}
                        to={to}
                        onClick={closeMenu}
                        className={({ isActive }) => navLinkClass(isActive)}
                        >
                        {label}
                        </NavLink>
                    ))}
                    <button
                        onClick={closeMenu}
                        className="text-left font-medium hover:underline text-gray-600 dark:text-neutral-400 dark:hover:text-neutral-500"
                    >
                        ログアウト
                    </button>
                </nav>
            </aside>
        </header>
    );
};

export default Header;
