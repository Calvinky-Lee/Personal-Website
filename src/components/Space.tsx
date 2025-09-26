import React, { useEffect, useRef } from 'react'

export function SpaceBackground(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let width = 0
    let height = 0

    type Star = { x: number; y: number; z: number; speed: number }
    let stars: Star[] = []

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const density = Math.floor((width * height) / 12000) // Fewer stars
      stars = Array.from({ length: density }, () => newStar())
    }

    const newStar = (): Star => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.9 + 0.1,
      speed: Math.random() * 0.2 + 0.02,
    })

    // Randomly distributed planets anywhere on screen
    const staticPlanets = [
      // Scattered across the entire screen
      { x: 0.15, y: 0.2, size: 8, color: '#ff6b6b' },
      { x: 0.85, y: 0.15, size: 6, color: '#4ecdc4' },
      { x: 0.25, y: 0.4, size: 10, color: '#45b7d1' },
      { x: 0.75, y: 0.35, size: 7, color: '#f9ca24' },
      { x: 0.1, y: 0.6, size: 5, color: '#6c5ce7' },
      { x: 0.9, y: 0.55, size: 9, color: '#fd79a8' },
      { x: 0.3, y: 0.8, size: 6, color: '#a29bfe' },
      { x: 0.7, y: 0.75, size: 8, color: '#ff6b6b' },
      { x: 0.5, y: 0.1, size: 4, color: '#4ecdc4' },
      { x: 0.4, y: 0.9, size: 7, color: '#45b7d1' },
      { x: 0.6, y: 0.95, size: 5, color: '#f9ca24' },
      { x: 0.2, y: 0.7, size: 9, color: '#6c5ce7' },
      { x: 0.8, y: 0.25, size: 6, color: '#fd79a8' },
      { x: 0.45, y: 0.5, size: 8, color: '#a29bfe' },
      { x: 0.55, y: 0.65, size: 7, color: '#ff6b6b' }
    ]

    let scrollY = 0
    let lastScrollY = 0
    let isScrolling = false
    let scrollTimeout: number | null = null
    let dynamicPlanets: any[] = []
    let persistentParallaxOffset = 0
    let parallaxStars: any[] = []

    const updateScroll = () => {
      scrollY = window.scrollY
      isScrolling = true
      
      // Update persistent parallax offset
      persistentParallaxOffset = scrollY
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Set scrolling to false after 150ms of no scrolling
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false
      }, 150)
    }

    const createDynamicPlanet = () => ({
      x: Math.random() * width, // Random position across screen
      y: Math.random() * height, // Random vertical position
      size: Math.random() * 8 + 4,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#a29bfe', '#ff6b6b'][Math.floor(Math.random() * 8)],
      parallaxSpeed: Math.random() * 0.1 + 0.05, // Random parallax speed
      life: 1,
      maxLife: Math.random() * 2000 + 1500, // Very long life
      opacity: 0, // Start invisible
      isNew: true,
      isDying: false,
      slideDirection: Math.random() * Math.PI * 2, // Random slide direction
      slideSpeed: Math.random() * 4 + 2, // Much faster slide speed when dying
      currentX: 0,
      currentY: 0
    })

    const createParallaxStar = () => ({
      x: Math.random() * width, // Random horizontal position
      y: -50, // Start above screen
      size: Math.random() * 2 + 1, // Small stars
      brightness: Math.random() * 0.8 + 0.2,
      parallaxSpeed: Math.random() * 0.3 + 0.1, // Different parallax speeds
      life: 1,
      maxLife: Math.random() * 1000 + 800,
      opacity: 0,
      isNew: true
    })

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw stars
      for (let s of stars) {
        s.x += s.speed * s.z * 0.4
        if (s.x > width) {
          s.x = 0; s.y = Math.random() * height; s.z = Math.random() * 0.9 + 0.1
        }
        
        // Tiny white star dots
        const brightness = 0.3 + s.z * 0.7
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
        const size = s.z * 0.5 + 0.5
        ctx.fillRect(s.x, s.y, size, size)
      }
      
      // Spawn new dynamic planets when scrolling (very rare)
      if (isScrolling) {
        const scrollDelta = Math.abs(scrollY - lastScrollY)
        if (scrollDelta > 500 && Math.random() > 0.98) {
          dynamicPlanets.push(createDynamicPlanet())
          lastScrollY = scrollY
        }
      }

      // Spawn parallax stars when scrolling down
      if (isScrolling && scrollY > lastScrollY) {
        if (Math.random() > 0.85) {
          parallaxStars.push(createParallaxStar())
        }
      }

      // Spawn top-left stars when reaching certifications/projects sections
      const certificationsSection = document.querySelector('#certifications')
      const projectsSection = document.querySelector('#projects')
      const isNearCertifications = certificationsSection && scrollY > certificationsSection.offsetTop - 200
      const isNearProjects = projectsSection && scrollY > projectsSection.offsetTop - 200
      
      if ((isNearCertifications || isNearProjects) && Math.random() > 0.95) {
        const topLeftStar = createParallaxStar()
        topLeftStar.x = Math.random() * (width * 0.3) // Top-left area
        topLeftStar.y = Math.random() * (height * 0.3) // Top-left area
        topLeftStar.parallaxSpeed = Math.random() * 0.2 + 0.1 // Slower parallax
        parallaxStars.push(topLeftStar)
      }

      // Update and draw dynamic planets with parallax
      dynamicPlanets = dynamicPlanets.filter(planet => {
        // Initialize current position if not set
        if (planet.currentX === 0 && planet.currentY === 0) {
          planet.currentX = planet.x
          planet.currentY = planet.y
        }
        
        // Update life and opacity - consistent behavior regardless of scrolling
        // Only decrease life extremely rarely to prevent sudden death
        if (Math.random() > 0.999) {
          planet.life++
        }
        const lifeRatio = planet.life / planet.maxLife
        
        if (planet.isNew) {
          // Fade in new planets
          planet.opacity += (1 - planet.opacity) * 0.1
          if (planet.opacity > 0.9) {
            planet.isNew = false
          }
        } else {
          // Check if planet should start dying (only when extremely old)
          if (lifeRatio < 0.02 && !planet.isDying) {
            planet.isDying = true
          }
          
          if (planet.isDying) {
            // Slide and fade out drastically
            planet.currentX += Math.cos(planet.slideDirection) * planet.slideSpeed
            planet.currentY += Math.sin(planet.slideDirection) * planet.slideSpeed
            planet.opacity = Math.max(0, lifeRatio * 4) // Much faster fade when sliding
          } else {
            // Keep planets visible much longer
            planet.opacity = Math.max(0.9, lifeRatio)
          }
        }
        
        // Remove planets that are completely faded out or slid off screen
        if (planet.opacity <= 0 || 
            planet.currentX < -100 || planet.currentX > width + 100 ||
            planet.currentY < -100 || planet.currentY > height + 100) {
          return false
        }
        
        // Calculate parallax position - use persistent offset
        const parallaxOffset = persistentParallaxOffset * planet.parallaxSpeed
        const x = planet.currentX + parallaxOffset * 0.3
        const y = planet.currentY + parallaxOffset * 0.7
        
        // Draw dynamic planet with parallax
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.size * 2)
        gradient.addColorStop(0, `${planet.color}${Math.floor(planet.opacity * 64).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(0.5, `${planet.color}${Math.floor(planet.opacity * 32).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${planet.color}00`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, planet.size * 2, 0, Math.PI * 2)
        ctx.fill()
        
        // Planet core
        ctx.fillStyle = `${planet.color}${Math.floor(planet.opacity * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(x, y, planet.size, 0, Math.PI * 2)
        ctx.fill()
        
        return true
      })

      // Update and draw parallax stars
      parallaxStars = parallaxStars.filter(star => {
        // Update life and opacity
        star.life++
        const lifeRatio = star.life / star.maxLife
        
        if (star.isNew) {
          // Fade in new stars
          star.opacity += (1 - star.opacity) * 0.1
          if (star.opacity > 0.9) {
            star.isNew = false
          }
        } else {
          // Fade out old stars
          star.opacity = Math.max(0, lifeRatio)
        }
        
        // Move star with parallax (different behavior for top-left stars)
        const parallaxOffset = persistentParallaxOffset * star.parallaxSpeed
        const isTopLeftStar = star.x < width * 0.3 && star.y < height * 0.3
        
        if (isTopLeftStar) {
          // Top-left stars move slowly and stay in area
          star.y += 0.2 + (star.parallaxSpeed * 0.1)
          star.x += (Math.random() - 0.5) * 0.1 // Slight horizontal drift
        } else {
          // Regular stars move down
          star.y += 0.5 + (star.parallaxSpeed * 0.5)
        }
        
        // Remove if off-screen or faded out
        if (star.y > height + 50 || star.opacity <= 0) {
          return false
        }
        
        // Calculate parallax position
        const x = star.x + parallaxOffset * 0.2
        const y = star.y + parallaxOffset * 0.8
        
        // Draw parallax star
        const finalBrightness = star.brightness * star.opacity
        ctx.fillStyle = `rgba(255, 255, 255, ${finalBrightness})`
        ctx.fillRect(x, y, star.size, star.size)
        
        return true
      })

      // Draw static planets with parallax effect
      staticPlanets.forEach((planet, index) => {
        // Calculate parallax offset based on persistent scroll and planet index
        const parallaxSpeed = 0.1 + (index % 3) * 0.05 // Different speeds for different planets
        const parallaxOffset = persistentParallaxOffset * parallaxSpeed
        
        // Apply parallax to both x and y positions
        const x = planet.x * width + parallaxOffset * 0.3
        const y = planet.y * height + parallaxOffset * 0.7
        
        // Planet glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.size * 2)
        gradient.addColorStop(0, `${planet.color}40`)
        gradient.addColorStop(0.5, `${planet.color}20`)
        gradient.addColorStop(1, `${planet.color}00`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, planet.size * 2, 0, Math.PI * 2)
        ctx.fill()
        
        // Planet core
        ctx.fillStyle = planet.color
        ctx.beginPath()
        ctx.arc(x, y, planet.size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', updateScroll)
    resize()
    raf = requestAnimationFrame(tick)
    return () => { 
      cancelAnimationFrame(raf); 
      if (scrollTimeout) clearTimeout(scrollTimeout)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="space-bg" aria-hidden />
  )
}


