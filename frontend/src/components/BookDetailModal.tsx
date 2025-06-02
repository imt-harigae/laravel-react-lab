import { motion, AnimatePresence } from "motion/react"
import React from "react"

type Props = {
  book: { title: string; image: string; description: string }
  onClose: () => void
}

export const BookDetailModal: React.FC<Props> = ({ book, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="flex w-[80%] h-[70%] bg-gray-100 rounded-xl shadow-lg overflow-hidden"
          initial={{ scale: 0.8, rotateY: 30 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0.8, rotateY: -30 }}
          transition={{ type: "spring", stiffness: 100 }}
          onClick={(e) => e.stopPropagation()}
          style={{ perspective: 1000 }}
        >
          <div className="w-1/2 bg-gray-100">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 p-6">
            <h2 className="text-2xl text-gray-600 font-bold mb-4">{book.title}</h2>
            <p className="text-gray-600">{book.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
