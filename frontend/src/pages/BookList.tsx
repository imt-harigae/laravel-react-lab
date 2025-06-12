// src/pages/BookList.tsx
import { useState } from "react"
import { BookCard } from "../components/book/BookCard"
import { BookDetailModal } from "../components/book/BookDetailModal"
import books from "../data/books"

export default function BookList() {
    const [selected, setSelected] = useState<number | null>(null)

    return (
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book, idx) => (
                <BookCard
                key={idx}
                title={book.title}
                image={book.image}
                onClick={() => setSelected(idx)}
                />
            ))}

            {selected !== null && (
                <BookDetailModal book={books[selected]} onClose={() => setSelected(null)} />
            )}
        </div>
    )
}