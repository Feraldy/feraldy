import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { getTextGradientClass } from '../context/ThemeContext'

const Navbar: React.FC = () => {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const navItems = [
    { path: '/resume', label: 'Resume' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path
  }

  // Auto-hide after 3 seconds of inactivity
  useEffect(() => {
    let hideTimer

    const resetTimer = () => {
      setIsVisible(true)
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 3000) // Hide after 3 seconds
    }

    const handleMouseMove = () => resetTimer()
    const handleKeyPress = () => resetTimer()
    const handleClick = () => resetTimer()

    // Initial timer
    resetTimer()

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('keypress', handleKeyPress)
    document.addEventListener('click', handleClick)

    return () => {
      clearTimeout(hideTimer)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keypress', handleKeyPress)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Show navbar on scroll
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    
    // Show navbar when scrolling up or at top
    if (currentScrollY < lastScrollY || currentScrollY < 10) {
      setIsVisible(true)
    }
    
    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Show navbar on hover over top area
  const handleMouseEnterTop = () => {
    setIsVisible(true)
  }

  return (
    <>
      {/* Invisible hover area at top of screen - only active when navbar is hidden */}
      <div 
        className={`fixed top-0 left-0 right-0 h-16 z-30 ${
          isVisible ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        onMouseEnter={handleMouseEnterTop}
      />
      
      {/* Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm z-40 border-b border-neutral-700 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={() => setIsVisible(true)}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className={`text-xl md:text-2xl font-bold ${getTextGradientClass('primary')}`}>
            Feraldy
          </a>
          <nav className="flex gap-3 md:gap-6">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-yellow-400 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar