if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
  
  // Disable animations for users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return
  }

  // Hero Animation
  const heroTl = gsap.timeline()
  
  heroTl.from(".hero-badge", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".hero-title", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.5")
  .from(".hero-subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .from(".hero-cta", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.4")

  // Parallax Hero
  gsap.to(".hero::before", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  })

  // Section Headers
  gsap.utils.toArray(".section-header").forEach(header => {
    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header,
        start: "top 80%"
      }
    })
  })

  // Feature Items
  gsap.utils.toArray(".feature-item").forEach((item, i) => {
    gsap.from(item, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%"
      }
    })
  })

  // Connectivity Cards
  gsap.utils.toArray(".connectivity-card, .connectivity-panel").forEach((card, i) => {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    })
  })

  // Masterplan Points
  gsap.utils.toArray(".info-point").forEach((point, i) => {
    gsap.from(point, {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: point,
        start: "top 85%"
      }
    })
  })

  // Amenity Cards
  gsap.from(".amenity-card", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".amenity-grid",
      start: "top 80%"
    }
  })

  // Pricing Cards
  gsap.from(".pricing-card", {
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".pricing-grid",
      start: "top 80%"
    }
  })

  // Location Items
  gsap.utils.toArray(".location-item").forEach((item, i) => {
    gsap.from(item, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%"
      }
    })
  })

  // Trust Cards
  gsap.from(".trust-card", {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".trust-grid",
      start: "top 80%"
    }
  })

  // FAQ Items
  gsap.from(".faq-item", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".faq-list",
      start: "top 85%"
    }
  })
}