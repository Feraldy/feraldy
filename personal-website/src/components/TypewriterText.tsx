import React, { useState, useEffect } from 'react'

interface TypewriterTextProps {
  texts: string[]
  delay?: number
  deleteDelay?: number
  pauseTime?: number
  onComplete?: () => void
  typeOnce?: boolean
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ texts, delay = 100, deleteDelay = 50, pauseTime = 3000, onComplete, typeOnce = false }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [partialDeleteTarget, setPartialDeleteTarget] = useState<number | null>(null)
  
  // Define typo corrections with partial deletion
  const typoCorrections: Record<number, { deleteToPosition: number; correctText: string }> = {
    1: { // "Welcome to my persnoal website!" -> "Welcome to my personal website!"
      deleteToPosition: 18, // Delete back to "Welcome to my pers"
      correctText: "Welcome to my personal website!"
    },
    3: { // "Thanks for vistiing! lets connect!" -> "Thanks for visiting! lets connect!"
      deleteToPosition: 16, // Delete back to "Thanks for visti"
      correctText: "Thanks for visiting! Lets connect!"
    }
  }
  
  // Define different pause times for typos vs normal text
  const getPauseTime = (index: number) => {
    // Shorter pause for typos (when we "realize" the mistake)
    if (index === 1 || index === 3) return 800 // typo texts
    return pauseTime // normal pause time
  }

  useEffect(() => {
    if (isComplete || isPaused) return

    const targetText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1))
        } else {
          // Finished typing - pause before next action
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            if (typeOnce || currentTextIndex === texts.length - 1) {
              // Complete if typeOnce or last message
              setIsComplete(true)
              if (onComplete) onComplete()
            } else {
              // Check if this is a typo that needs partial deletion
              const correction = typoCorrections[currentTextIndex]
              if (correction) {
                setPartialDeleteTarget(correction.deleteToPosition)
              }
              // Start deleting
              setIsDeleting(true)
            }
          }, getPauseTime(currentTextIndex))
        }
      } else {
        // Deleting
        const shouldStopDeleting = partialDeleteTarget !== null 
          ? currentText.length <= partialDeleteTarget 
          : currentText.length === 0
          
        if (!shouldStopDeleting) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting - move to next text
          setIsDeleting(false)
          setPartialDeleteTarget(null)
          const nextIndex = currentTextIndex + 1
          if (nextIndex < texts.length) {
            setCurrentTextIndex(nextIndex)
          } else {
            setIsComplete(true)
            if (onComplete) onComplete()
          }
        }
      }
    }, isDeleting ? deleteDelay : delay)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, delay, deleteDelay, pauseTime, isComplete, onComplete, typeOnce, isPaused, partialDeleteTarget])

  const renderStyledText = (text: string) => {
    // Find the position of "Feraldy" in the target text
    const targetText = texts[currentTextIndex]
    const feraldyIndex = targetText.indexOf("Feraldy")
    
    if (feraldyIndex !== -1) {
      const feraldyEndIndex = feraldyIndex + "Feraldy".length
      const beforeFeraldy = text.slice(0, feraldyIndex)
      const feraldyPart = text.slice(feraldyIndex, Math.min(text.length, feraldyEndIndex))
      const afterFeraldy = text.slice(feraldyEndIndex)
      
      return (
        <>
          {beforeFeraldy}
          {feraldyPart && (
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              {feraldyPart}
            </span>
          )}
          {afterFeraldy}
        </>
      )
    }
    return text
  }

  return (
    <span className="relative">
      {renderStyledText(currentText)}
      <span className="terminal-cursor text-yellow-400 ml-1 font-bold">|</span>
    </span>
  )
}

export default TypewriterText