'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  highlightedWords?: string[]
  highlightClassName?: string
  delay?: number
}

export function AnimatedText({
  text,
  className = '',
  highlightedWords = [],
  highlightClassName = 'text-primary',
  delay = 0,
}: AnimatedTextProps) {
  // Dividir el texto en palabras, preservando espacios y saltos de línea
  const words = text.split(/(\s+)/).filter(Boolean)

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        // Si es solo espacio en blanco, renderizar sin animación
        if (word.trim() === '') {
          return <span key={index}>{word}</span>
        }

        // Verificar si la palabra debe ser resaltada
        const isHighlighted = highlightedWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        )

        return (
          <motion.span
            key={index}
            variants={child}
            style={{
              display: 'inline-block',
              willChange: 'transform',
            }}
            className={isHighlighted ? highlightClassName : ''}
          >
            {word}
          </motion.span>
        )
      })}
    </motion.h1>
  )
}

interface AnimatedTextLinesProps {
  lines: Array<{
    text: string
    highlightedWords?: string[]
  }>
  className?: string
  highlightClassName?: string
  delay?: number
  lineDelay?: number
}

export function AnimatedTextLines({
  lines,
  className = '',
  highlightClassName = 'text-primary',
  delay = 0,
  lineDelay = 0.3,
}: AnimatedTextLinesProps) {
  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <AnimatedText
          key={lineIndex}
          text={line.text}
          highlightedWords={line.highlightedWords || []}
          highlightClassName={highlightClassName}
          delay={delay + lineIndex * lineDelay}
          className="block"
        />
      ))}
    </div>
  )
}
