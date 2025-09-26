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

    // Space-themed elements: asteroids, comets, and nebula particles
    const staticSpaceElements = [
      // Asteroids - rocky, irregular shapes
      { x: 0.15, y: 0.2, size: 6, color: '#8B7355', type: 'asteroid', rotation: 0 },
      { x: 0.85, y: 0.15, size: 4, color: '#A0522D', type: 'asteroid', rotation: 0 },
      { x: 0.25, y: 0.4, size: 8, color: '#696969', type: 'asteroid', rotation: 0 },
      { x: 0.75, y: 0.35, size: 5, color: '#8B4513', type: 'asteroid', rotation: 0 },
      { x: 0.1, y: 0.6, size: 3, color: '#654321', type: 'asteroid', rotation: 0 },
      { x: 0.9, y: 0.55, size: 7, color: '#8B7355', type: 'asteroid', rotation: 0 },
      
      // Comets - bright with tails
      { x: 0.3, y: 0.8, size: 4, color: '#87CEEB', type: 'comet', rotation: 0, tailLength: 15 },
      { x: 0.7, y: 0.75, size: 5, color: '#E0E0E0', type: 'comet', rotation: 0, tailLength: 20 },
      { x: 0.5, y: 0.1, size: 3, color: '#B0E0E6', type: 'comet', rotation: 0, tailLength: 12 },
      
      // Nebula particles - glowing, ethereal
      { x: 0.4, y: 0.9, size: 6, color: '#9370DB', type: 'nebula', rotation: 0, glow: 0.6 },
      { x: 0.6, y: 0.95, size: 4, color: '#FF69B4', type: 'nebula', rotation: 0, glow: 0.8 },
      { x: 0.2, y: 0.7, size: 8, color: '#00CED1', type: 'nebula', rotation: 0, glow: 0.5 },
      { x: 0.8, y: 0.25, size: 5, color: '#FF1493', type: 'nebula', rotation: 0, glow: 0.7 },
      { x: 0.45, y: 0.5, size: 7, color: '#00BFFF', type: 'nebula', rotation: 0, glow: 0.4 },
      { x: 0.55, y: 0.65, size: 6, color: '#DA70D6', type: 'nebula', rotation: 0, glow: 0.9 }
    ]

    let scrollY = 0
    let lastScrollY = 0
    let isScrolling = false
    let scrollTimeout: number | null = null
    let dynamicPlanets: any[] = []
    let persistentParallaxOffset = 0
    let parallaxStars: any[] = []
    let fallingStars: any[] = []

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

    const createDynamicSpaceElement = () => {
      const types = ['asteroid', 'comet', 'nebula']
      const type = types[Math.floor(Math.random() * types.length)]
      
      let color, size, extraProps = {}
      
      switch (type) {
        case 'asteroid':
          color = ['#8B7355', '#A0522D', '#696969', '#8B4513', '#654321'][Math.floor(Math.random() * 5)]
          size = Math.random() * 6 + 3
          extraProps = { rotation: 0 }
          break
        case 'comet':
          color = ['#87CEEB', '#E0E0E0', '#B0E0E6', '#F0F8FF', '#E6E6FA'][Math.floor(Math.random() * 5)]
          size = Math.random() * 5 + 2
          extraProps = { tailLength: Math.random() * 15 + 10, rotation: 0 }
          break
        case 'nebula':
          color = ['#9370DB', '#FF69B4', '#00CED1', '#FF1493', '#00BFFF', '#DA70D6'][Math.floor(Math.random() * 6)]
          size = Math.random() * 8 + 4
          extraProps = { glow: Math.random() * 0.5 + 0.3, rotation: 0 }
          break
      }
      
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color,
        type,
        parallaxSpeed: Math.random() * 0.1 + 0.05,
        life: 1,
        maxLife: Math.random() * 2000 + 1500,
        opacity: 0,
        isNew: true,
        isDying: false,
        slideDirection: Math.random() * Math.PI * 2,
        slideSpeed: Math.random() * 4 + 2,
        currentX: 0,
        currentY: 0,
        ...extraProps
      }
    }

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

    const createFallingStar = () => ({
      x: Math.random() * width, // Random horizontal position
      y: -20, // Start above screen
      size: Math.random() * 3 + 1, // Slightly larger than regular stars
      brightness: Math.random() * 0.9 + 0.3, // Brighter than regular stars
      speed: Math.random() * 3 + 2, // Faster falling speed
      angle: Math.random() * 0.5 + 0.1, // Slight angle for diagonal fall
      life: 1,
      maxLife: Math.random() * 800 + 600, // Shorter life for falling effect
      opacity: 0,
      isNew: true,
      trail: [] // Array to store trail positions
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
      
      // Spawn new dynamic space elements when scrolling (very rare)
      if (isScrolling) {
        const scrollDelta = Math.abs(scrollY - lastScrollY)
        if (scrollDelta > 500 && Math.random() > 0.98) {
          dynamicPlanets.push(createDynamicSpaceElement())
          lastScrollY = scrollY
        }
      }

      // Spawn parallax stars when scrolling down
      if (isScrolling && scrollY > lastScrollY) {
        if (Math.random() > 0.85) {
          parallaxStars.push(createParallaxStar())
        }
      }

      // Spawn falling stars more frequently
      if (Math.random() > 0.92) {
        fallingStars.push(createFallingStar())
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
        
        // Draw dynamic space element with parallax based on type
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(planet.rotation || 0)
        
        const alpha = Math.floor(planet.opacity * 255).toString(16).padStart(2, '0')
        
        switch (planet.type) {
          case 'asteroid':
            // Draw irregular asteroid shape
            ctx.fillStyle = `${planet.color}${alpha}`
            ctx.beginPath()
            ctx.arc(0, 0, planet.size, 0, Math.PI * 2)
            ctx.fill()
            // Add some surface details
            ctx.fillStyle = `${planet.color}${Math.floor(planet.opacity * 128).toString(16).padStart(2, '0')}`
            ctx.beginPath()
            ctx.arc(-planet.size * 0.3, -planet.size * 0.3, planet.size * 0.3, 0, Math.PI * 2)
            ctx.fill()
            break
            
          case 'comet':
            // Draw comet with tail
            const tailLength = planet.tailLength || 15
            const tailGradient = ctx.createLinearGradient(0, 0, -tailLength, 0)
            tailGradient.addColorStop(0, `${planet.color}${alpha}`)
            tailGradient.addColorStop(0.5, `${planet.color}${Math.floor(planet.opacity * 64).toString(16).padStart(2, '0')}`)
            tailGradient.addColorStop(1, `${planet.color}00`)
            
            ctx.fillStyle = tailGradient
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(-tailLength, -planet.size * 0.5)
            ctx.lineTo(-tailLength * 0.7, 0)
            ctx.lineTo(-tailLength, planet.size * 0.5)
            ctx.closePath()
            ctx.fill()
            
            // Comet core
            ctx.fillStyle = `${planet.color}${alpha}`
            ctx.beginPath()
            ctx.arc(0, 0, planet.size, 0, Math.PI * 2)
            ctx.fill()
            break
            
          case 'nebula':
            // Draw glowing nebula particle
            const glowSize = planet.size * (2 + (planet.glow || 0.5))
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize)
            gradient.addColorStop(0, `${planet.color}${alpha}`)
            gradient.addColorStop(0.3, `${planet.color}${Math.floor(planet.opacity * 128).toString(16).padStart(2, '0')}`)
            gradient.addColorStop(0.7, `${planet.color}${Math.floor(planet.opacity * 64).toString(16).padStart(2, '0')}`)
            gradient.addColorStop(1, `${planet.color}00`)
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(0, 0, glowSize, 0, Math.PI * 2)
            ctx.fill()
            
            // Bright core
            ctx.fillStyle = `${planet.color}${alpha}`
            ctx.beginPath()
            ctx.arc(0, 0, planet.size * 0.6, 0, Math.PI * 2)
            ctx.fill()
            break
        }
        
        ctx.restore()
        
        // Update rotation for next frame
        if (planet.rotation !== undefined) {
          planet.rotation += 0.02
        }
        
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

      // Update and draw falling stars
      fallingStars = fallingStars.filter(star => {
        // Update life and opacity
        star.life++
        const lifeRatio = star.life / star.maxLife
        
        if (star.isNew) {
          // Fade in new falling stars
          star.opacity += (1 - star.opacity) * 0.2
          if (star.opacity > 0.9) {
            star.isNew = false
          }
        } else {
          // Fade out old falling stars
          star.opacity = Math.max(0, lifeRatio)
        }
        
        // Update position with diagonal fall
        star.x += Math.sin(star.angle) * star.speed
        star.y += Math.cos(star.angle) * star.speed
        
        // Add current position to trail
        star.trail.push({ x: star.x, y: star.y, opacity: star.opacity })
        
        // Keep only last 8 trail positions
        if (star.trail.length > 8) {
          star.trail.shift()
        }
        
        // Remove if off-screen or faded out
        if (star.y > height + 50 || star.x > width + 50 || star.x < -50 || star.opacity <= 0) {
          return false
        }
        
        // Draw falling star trail
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.brightness * 0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let i = 0; i < star.trail.length - 1; i++) {
          const trailPoint = star.trail[i]
          const nextPoint = star.trail[i + 1]
          const trailOpacity = (i / star.trail.length) * star.opacity
          
          ctx.globalAlpha = trailOpacity
          ctx.moveTo(trailPoint.x, trailPoint.y)
          ctx.lineTo(nextPoint.x, nextPoint.y)
        }
        ctx.stroke()
        ctx.globalAlpha = 1
        
        // Draw falling star core
        const finalBrightness = star.brightness * star.opacity
        ctx.fillStyle = `rgba(255, 255, 255, ${finalBrightness})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add sparkle effect
        ctx.fillStyle = `rgba(255, 255, 255, ${finalBrightness * 0.8})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        
        return true
      })

      // Draw static space elements with parallax effect
      staticSpaceElements.forEach((element, index) => {
        // Calculate parallax offset based on persistent scroll and element index
        const parallaxSpeed = 0.1 + (index % 3) * 0.05 // Different speeds for different elements
        const parallaxOffset = persistentParallaxOffset * parallaxSpeed
        
        // Apply parallax to both x and y positions
        const x = element.x * width + parallaxOffset * 0.3
        const y = element.y * height + parallaxOffset * 0.7
        
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(element.rotation || 0)
        
        switch (element.type) {
          case 'asteroid':
            // Draw irregular asteroid shape
            ctx.fillStyle = element.color
            ctx.beginPath()
            ctx.arc(0, 0, element.size, 0, Math.PI * 2)
            ctx.fill()
            // Add some surface details
            ctx.fillStyle = element.color + '80'
            ctx.beginPath()
            ctx.arc(-element.size * 0.3, -element.size * 0.3, element.size * 0.3, 0, Math.PI * 2)
            ctx.fill()
            break
            
          case 'comet':
            // Draw comet with tail
            const tailLength = element.tailLength || 15
            const tailGradient = ctx.createLinearGradient(0, 0, -tailLength, 0)
            tailGradient.addColorStop(0, element.color)
            tailGradient.addColorStop(0.5, element.color + '80')
            tailGradient.addColorStop(1, element.color + '00')
            
            ctx.fillStyle = tailGradient
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(-tailLength, -element.size * 0.5)
            ctx.lineTo(-tailLength * 0.7, 0)
            ctx.lineTo(-tailLength, element.size * 0.5)
            ctx.closePath()
            ctx.fill()
            
            // Comet core
            ctx.fillStyle = element.color
            ctx.beginPath()
            ctx.arc(0, 0, element.size, 0, Math.PI * 2)
            ctx.fill()
            break
            
          case 'nebula':
            // Draw glowing nebula particle
            const glowSize = element.size * (2 + (element.glow || 0.5))
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize)
            gradient.addColorStop(0, element.color)
            gradient.addColorStop(0.3, element.color + '80')
            gradient.addColorStop(0.7, element.color + '40')
            gradient.addColorStop(1, element.color + '00')
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(0, 0, glowSize, 0, Math.PI * 2)
            ctx.fill()
            
            // Bright core
            ctx.fillStyle = element.color
            ctx.beginPath()
            ctx.arc(0, 0, element.size * 0.6, 0, Math.PI * 2)
            ctx.fill()
            break
        }
        
        ctx.restore()
        
        // Update rotation for next frame
        if (element.rotation !== undefined) {
          element.rotation += 0.01
        }
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


