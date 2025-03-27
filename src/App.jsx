import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import styles from './App.module.css'

// Initialize EmailJS
emailjs.init("evzCTi6YyPyEFUJOm")

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    message: '',
    preferredDate: '',
    size: '',
    placement: ''
  })

  // Add portfolio state
  const [currentSet, setCurrentSet] = useState(0)
  const [slideDirection, setSlideDirection] = useState(null)
  
  // Add preview state and handlers
  const [previewImage, setPreviewImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Portfolio image sets
  const portfolioSets = [
    // First set (original images)
    [
      '/portfolio/tattoo-1.jpeg',
      '/portfolio/tattoo-2.jpeg',
      '/portfolio/tattoo-3.jpeg',
      '/portfolio/tattoo-4.jpeg',
      '/portfolio/tattoo-5.jpeg',
      '/portfolio/tattoo-6.jpeg',
    ],
    // Second set
    [
      '/portfolio/tattoo-7.jpeg',
      '/portfolio/tattoo-8.jpeg',
      '/portfolio/tattoo-9.jpeg',
      '/portfolio/tattoo-10.jpeg',
      '/portfolio/tattoo-11.jpeg',
      '/portfolio/tattoo-12.jpeg',
    ],
  ]

  // Flatten portfolio images for easier navigation
  const allImages = portfolioSets.flat()

  const [hasScrolled, setHasScrolled] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleNextSet = () => {
    setSlideDirection('next')
    setCurrentSet((prev) => (prev + 1) % portfolioSets.length)
  }

  const handlePrevSet = () => {
    setSlideDirection('prev')
    setCurrentSet(prev => prev - 1)
  }

  const openPreview = (setIndex, imageIndex) => {
    const flatIndex = setIndex * 6 + imageIndex
    setCurrentImageIndex(flatIndex)
    setPreviewImage(allImages[flatIndex])
  }

  const closePreview = () => {
    setPreviewImage(null)
  }

  const showNextImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % allImages.length
      setPreviewImage(allImages[next])
      return next
    })
  }

  const showPrevImage = () => {
    setCurrentImageIndex((prev) => {
      const next = prev === 0 ? allImages.length - 1 : prev - 1
      setPreviewImage(allImages[next])
      return next
    })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!previewImage) return
      
      switch (e.key) {
        case 'ArrowRight':
          showNextImage()
          break
        case 'ArrowLeft':
          showPrevImage()
          break
        case 'Escape':
          closePreview()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewImage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const templateParams = {
        to_name: "Anna",
        from_name: formData.name,
        reply_to: formData.email,
        phone_number: formData.phone,
        instagram_handle: formData.instagram || 'Not provided',
        preferred_date: formData.preferredDate,
        tattoo_size: formData.size,
        tattoo_placement: formData.placement,
        tattoo_description: formData.message,
        email_subject: `New Tattoo Booking Request from ${formData.name}`,
        message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Instagram: ${formData.instagram || 'Not provided'}
Preferred Date: ${formData.preferredDate}
Size: ${formData.size}
Placement: ${formData.placement}

Description:
${formData.message}
        `
      }

      await emailjs.send(
        'service_0l737m9',
        'template_dwir8mk',
        templateParams
      )
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        instagram: '',
        message: '',
        preferredDate: '',
        size: '',
        placement: ''
      })
    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function scrollToPortfolio() {
    setShowScrollIndicator(false)
    setHasScrolled(true)
    const portfolioSection = document.getElementById('portfolio')
    portfolioSection.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true)
        setShowScrollIndicator(false)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function scrollToTop(e) {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const createSparkle = (e) => {
    // Don't create sparkles if clicking on interactive elements
    if (
      e.target.closest('button') ||
      e.target.closest('a') ||
      e.target.closest('input') ||
      e.target.closest('textarea') ||
      e.target.closest('.' + styles.portfolioItem) ||
      e.target.closest('.' + styles.modalNavButton) ||
      e.target.closest('.' + styles.closeButton)
    ) {
      return;
    }

    const sparkles = ['✨', '⭐️', '🌟', '💫'];
    const sparkleContainer = document.createElement('div');
    const numSparkles = Math.floor(Math.random() * 2) + 3; // 3-4 sparkles

    // Create sparkles in a container for better performance
    for (let i = 0; i < numSparkles; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = styles.sparkle;
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      
      // Add slight random offset for each sparkle
      const offsetX = i === 0 ? 0 : (Math.random() * 60 - 30);
      const offsetY = i === 0 ? 0 : (Math.random() * 60 - 30);
      const delay = i * 50; // Stagger the animations
      
      sparkle.style.left = (e.clientX + offsetX) + 'px';
      sparkle.style.top = (e.clientY + offsetY) + 'px';
      sparkle.style.animationDelay = delay + 'ms';
      
      sparkleContainer.appendChild(sparkle);
    }

    document.body.appendChild(sparkleContainer);

    // Clean up all sparkles after the longest animation + delay
    setTimeout(() => {
      if (sparkleContainer && document.body.contains(sparkleContainer)) {
        sparkleContainer.remove();
      }
    }, 1500); // Increased to account for delays
  };

  // Debounce the sparkle creation to prevent too many sparkles
  const debouncedCreateSparkle = (e) => {
    if (window.lastSparkleTime && Date.now() - window.lastSparkleTime < 50) {
      return; // Prevent creating sparkles too quickly
    }
    window.lastSparkleTime = Date.now();
    createSparkle(e);
  };

  useEffect(() => {
    document.addEventListener('click', debouncedCreateSparkle);
    return () => document.removeEventListener('click', debouncedCreateSparkle);
  }, []);

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <a href="/" className={styles.navBrand} onClick={scrollToTop}>
          <img 
            src="/smallseyss-logo.svg" 
            className={styles.logoIcon} 
            alt="Smallseyss Logo"
            data-scrolled={hasScrolled}
          />
        </a>
        <div className={styles.navLinks}>
          <a href="/" className={styles.navLink} onClick={scrollToTop}>🧚✨</a>
          <a 
            href="#portfolio" 
            className={styles.navLink} 
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('portfolio')
            }}
          >
            portfolio
          </a>
          <a 
            href="#booking" 
            className={styles.bookNowButton}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('booking')
            }}
          >
            book now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroImage}>
          <img src="/hero-image.JPG" alt="Tattoo Art" />
        </div>
        <img 
          src="/smallseyss-logo.svg" 
          className={styles.heroLogo} 
          alt="Smallseyss Logo"
          data-scrolled={hasScrolled}
        />
        <div className={styles.heroContent}>
          <p className={styles.heroGreeting}>hey, i'm</p>
          <h1 className={styles.heroTitle}>Anna Seyss</h1>
          <p className={styles.heroSubtitle}>smallseyss.ink</p>
          <p className={styles.heroDescription}>
            creating tiny handwritten lettering and fine line tattoos with love in Berlin ✨
          </p>
          <div className={styles.heroButtons}>
            <a href="https://instagram.com/smallseyss.ink" target="_blank" rel="noopener noreferrer" className={styles.heroButtonDark}>
              <svg className={styles.instagramIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="#booking" 
              className={styles.heroButton}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('booking')
              }}
            >
              book now
              <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L20 12L12 20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {showScrollIndicator && (
        <div className={styles.scrollIndicatorContainer}>
          <div className={styles.scrollIndicator} onClick={scrollToPortfolio} aria-label="Scroll to portfolio">
            <div className={styles.arrow}></div>
          </div>
        </div>
      )}

      {/* Portfolio Section */}
      <section id="portfolio" className={styles.portfolioSection}>
        <div className={styles.portfolioContainer}>
          <h2 className={styles.portfolioTitle}>Portfolio</h2>
          <div className={styles.portfolioGridContainer}>
            <div className={styles.portfolioGridWrapper}>
              {portfolioSets.map((set, setIndex) => (
                <div 
                  key={setIndex} 
                  className={styles.portfolioGridSet}
                  data-active={setIndex === currentSet}
                  data-direction={slideDirection || (setIndex === 0 ? null : 'prev')}
                >
                  {set.map((src, index) => (
                    <div 
                      key={`${setIndex}-${index}`} 
                      className={styles.portfolioItem}
                      onClick={() => openPreview(setIndex, index)}
                    >
                      <img src={src} alt={`Tattoo work ${setIndex * 6 + index + 1}`} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {currentSet > 0 && (
              <div 
                className={styles.portfolioPrevIndicator}
                onClick={handlePrevSet}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className={styles.arrowIcon}>
                  <path fill="currentColor" d="M14.6 18l1.4-1.4L11.4 12l4.6-4.6L14.6 6l-6 6z"/>
                </svg>
              </div>
            )}
            {currentSet < portfolioSets.length - 1 && (
              <div 
                className={styles.portfolioNextIndicator}
                onClick={handleNextSet}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className={styles.arrowIcon}>
                  <path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4 9.4 6l6 6z"/>
                </svg>
              </div>
            )}
          </div>

          {/* Image Preview Modal */}
          <div 
            className={styles.imagePreviewModal}
            data-visible={!!previewImage}
            onClick={closePreview}
          >
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closePreview}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
              {previewImage && (
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className={styles.modalImage}
                />
              )}
              <button 
                className={styles.modalPrevButton}
                onClick={showPrevImage}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M14.6 18l1.4-1.4L11.4 12l4.6-4.6L14.6 6l-6 6z"/>
                </svg>
              </button>
              <button 
                className={styles.modalNextButton}
                onClick={showNextImage}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4 9.4 6l6 6z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.portfolioActions}>
            <a 
              href="https://instagram.com/smallseyss.ink" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.viewMoreButton}
            >
              view more on instagram
              <svg className={styles.instagramIcon} viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
        </a>
      </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className={styles.bookingSection}>
        <div className={styles.bookingContainer}>
          <h2 className={styles.bookingTitle}>Book Your Appointment</h2>
          <p className={styles.bookingSubtitle}>
            Fill out the form below to request a tattoo appointment with me 🧚✨<br />
            <i>Du kannst es auch auf Deutsch ausfüllen</i> ☺️
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+49 123 456 7890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="instagram" className={styles.label}>Instagram Handle (optional)</label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  placeholder="@yourusername"
                  value={formData.instagram}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="size" className={styles.label}>Size</label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  className={styles.input}
                >
                  <option value="" disabled>Select size</option>
                  <option value="tiny">tiny (1-3cm)</option>
                  <option value="small">small (3-5cm)</option>
                  <option value="medium">medium (5-10cm)</option>
                  <option value="large">large (10cm+)</option>
                </select>
              </div>
              </div>
              <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="placement" className={styles.label}>Placement</label>
                <select
                  id="placement"
                  name="placement"
                  value={formData.placement}
                  onChange={handleChange}
                  required
                  className={styles.input}
                >
                  <option value="" disabled>Select placement</option>
                  <option value="arm">arm</option>
                  <option value="leg">leg</option>
                  <option value="torso">chest</option>
                  <option value="back">back</option>
                  <option value="hand">hand</option>
                  <option value="other">other</option>
                </select>
              </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="preferredDate" className={styles.label}>Availability for your appointment</label>
              <input
                type="text"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                placeholder="e.g., after 4pm any day next week, between 10am and 6pm any day next week, flexible"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Tattoo Description</label>
              <textarea
                id="message"
                name="message"
                placeholder="Please describe your tattoo idea in detail. Include size, style preferences (fine line, tiny tattoo, lettering, etc.), and any reference images you might have."
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.textarea}
                rows={6}
              />
            </div>
            <p className={styles.formNote}>
              You can email reference images to booking@smallseyss.ink with your name in the subject line if you want to.
            </p>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Booking Request'}
        </button>
            {submitStatus === 'success' && (
              <p className={styles.successMessage}>
                Thank you! Your booking request has been sent successfully. I'll get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.errorMessage}>
                Sorry, there was an error sending your request. Please try again or contact us directly at info@smallseyss.ink
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a 
              href="/impressum" 
              className={styles.footerLink}
            >
              Impressum
            </a>
            <a 
              href="/datenschutz" 
              className={styles.footerLink}
            >
              Datenschutz
            </a>
          </div>
          <p className={styles.copyright}>
            © 2024 smallseyss.ink - All rights reserved
        </p>
      </div>
      </footer>
    </div>
  )
}

export default App
