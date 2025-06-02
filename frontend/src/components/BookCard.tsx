// components/BookCard.tsx
import { motion } from "motion/react"
import React from "react"

type Props = {
  title: string
  image: string
  onClick: () => void
}

export const BookCard: React.FC<Props> = ({ title, image, onClick }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer w-full aspect-[3/4]"
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </motion.div>
  )
}
