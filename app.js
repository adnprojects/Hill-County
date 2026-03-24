document.body.classList.add("js-enabled")

// ─── REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL ───
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwC42r4M62NjzEWJlNXCvLq16BkQ5n8RSnoPk-KyvY7A6LCBEMdXhTMkD_D6f2TXzl1xA/exec"
// ─────────────────────────────────────────────────────────────

// Image load handling
document.querySelectorAll("img[loading='lazy']").forEach(img => {
  if (img.complete) {
    img.classList.add("loaded")
  } else {
    img.addEventListener("load", () => img.classList.add("loaded"))
  }
})

// Scroll to Top Button
const scrollTopBtn = document.querySelector(".scroll-top")
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 500)
  })
}

// Mobile Menu
const menuToggle = document.querySelector(".menu-toggle")
const siteNav = document.querySelector(".site-nav")
const navActions = document.querySelector(".nav-actions")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true"
    menuToggle.setAttribute("aria-expanded", String(!isOpen))
    siteNav?.classList.toggle("is-open", !isOpen)
    navActions?.classList.toggle("is-open", !isOpen)
  })
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const href = this.getAttribute("href")
    if (href === "#") return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({top, behavior:"smooth"})
    }
  })
})

// Reveal on Scroll
const revealNodes = document.querySelectorAll(".reveal")
if ("IntersectionObserver" in window && revealNodes.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add("is-visible")
      revealObserver.unobserve(entry.target)
    })
  }, {threshold: 0.15})
  revealNodes.forEach(node => revealObserver.observe(node))
} else {
  revealNodes.forEach(node => node.classList.add("is-visible"))
}

// Active Nav Link
const navLinks = document.querySelectorAll(".site-nav a")
const sections = document.querySelectorAll("section[id]")
if (sections.length > 0 && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const id = entry.target.getAttribute("id")
      navLinks.forEach(link => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id)
      })
    })
  }, {rootMargin: "-30% 0px -50% 0px"})
  sections.forEach(section => navObserver.observe(section))
}

// ─── Helper: send data to Google Sheets ───────────────────────
function sendToGoogleSheet(payload) {
  return fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",           // required for Apps Script CORS
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
}
// ──────────────────────────────────────────────────────────────

// Lead Form
const leadForm = document.getElementById("lead-form")
const leadValidators = {
  name: (v) => v.trim().length >= 2 ? "" : "Enter a valid name",
  phone: (v) => /^\d{10}$/.test(v.replace(/\D/g, "")) ? "" : "Enter 10-digit mobile",
  interest: (v) => v ? "" : "Select a plot preference",
  timeline: (v) => v ? "" : "Select a timeline"
}

const setFieldError = (form, field, msg) => {
  const group = field.closest(".field-group")
  const errorEl = form.querySelector(`[data-error-for="${field.name}"]`)
  if (group) group.classList.toggle("has-error", Boolean(msg))
  if (errorEl) errorEl.textContent = msg
}

if (leadForm) {
  leadForm.querySelectorAll("input, select").forEach(field => {
    field.addEventListener("input", () => {
      const validate = leadValidators[field.name]
      if (validate) setFieldError(leadForm, field, validate(field.value))
    })
  })

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(leadForm)
    let hasErrors = false
    const payload = {}

    leadForm.querySelectorAll("input, select").forEach(field => {
      const value = String(formData.get(field.name) || "").trim()
      payload[field.name] = value
      const validate = leadValidators[field.name]
      if (validate) {
        const msg = validate(value)
        setFieldError(leadForm, field, msg)
        hasErrors = hasErrors || Boolean(msg)
      }
    })

    if (hasErrors) return

    // Save to localStorage (backup)
    const leads = JSON.parse(localStorage.getItem("hillCountyLeads") || "[]")
    leads.push({...payload, capturedAt: new Date().toISOString()})
    localStorage.setItem("hillCountyLeads", JSON.stringify(leads))

    // Send to Google Sheets
    sendToGoogleSheet({ ...payload, source: "Contact Form" })
      .catch(err => console.error("Sheet sync failed:", err))

    // WhatsApp message
    const visitDateText = payload.visitDate ? `\nPreferred visit: ${payload.visitDate}` : ""
    const waMsg = encodeURIComponent(`Hi Pragna Hill County, I want a callback.\nName: ${payload.name}\nPhone: ${payload.phone}\nPlot: ${payload.interest}\nTimeline: ${payload.timeline}${visitDateText}`)

    const successBox = leadForm.querySelector(".form-success")
    if (successBox) {
      successBox.style.display = "block"
      successBox.innerHTML = `Request saved! <a href="https://wa.me/918790387299?text=${waMsg}" target="_blank" style="color:var(--brand);">Continue on WhatsApp</a>`
    }
    leadForm.reset()
  })

  const visitDateInput = document.getElementById("visit-date")
  if (visitDateInput) {
    visitDateInput.min = new Date().toISOString().split("T")[0]
  }
}

// Download Modal
const downloadModal = document.getElementById("download-modal")
const downloadForm = document.getElementById("download-form")

if (downloadModal && downloadForm) {
  const modalBackdrop = downloadModal.querySelector(".modal-backdrop")
  const modalClose = downloadModal.querySelector(".modal-close")

  const openModal = () => downloadModal.setAttribute("aria-hidden", "false")
  const closeModal = () => {
    downloadModal.setAttribute("aria-hidden", "true")
    downloadForm.reset()
    downloadForm.querySelectorAll(".field-group").forEach(g => g.classList.remove("has-error"))
    downloadForm.querySelectorAll(".field-error").forEach(e => e.textContent = "")
    const successEl = downloadForm.querySelector(".download-success")
    if (successEl) successEl.style.display = "none"
  }

  modalBackdrop?.addEventListener("click", closeModal)
  modalClose?.addEventListener("click", closeModal)

  let pendingDownload = "brochure"

  document.querySelectorAll(".btn-download").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      pendingDownload = btn.getAttribute("data-download") || "brochure"
      openModal()
    })
  })

  downloadForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(downloadForm)
    const payload = {
      name: formData.get("name")?.trim() || "",
      email: formData.get("email")?.trim() || "",
      phone: formData.get("phone")?.trim() || ""
    }

    let hasErrors = false

    if (payload.name.length < 2) {
      downloadForm.querySelector('[data-error-for="name"]').textContent = "Enter a valid name"
      hasErrors = true
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      downloadForm.querySelector('[data-error-for="email"]').textContent = "Enter a valid email"
      hasErrors = true
    }

    if (!/^\d{10}$/.test(payload.phone.replace(/\D/g, ""))) {
      downloadForm.querySelector('[data-error-for="phone"]').textContent = "Enter 10-digit mobile"
      hasErrors = true
    }

    if (hasErrors) return

    // Save to localStorage (backup)
    const downloadLeads = JSON.parse(localStorage.getItem("hillCountyDownloadLeads") || "[]")
    downloadLeads.push({...payload, downloaded: pendingDownload, capturedAt: new Date().toISOString()})
    localStorage.setItem("hillCountyDownloadLeads", JSON.stringify(downloadLeads))

    // Send to Google Sheets
    sendToGoogleSheet({ ...payload, source: `Download - ${pendingDownload}` })
      .catch(err => console.error("Sheet sync failed:", err))

    // Trigger file download
    const files = {brochure: "brochure.pdf", layout: "layout.pdf"}
    const fileUrl = files[pendingDownload] || files.brochure

    fetch(fileUrl)
      .then(res => {
        if (!res.ok) throw new Error('File not found')
        return res.blob()
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileUrl.split('/').pop()
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      })
      .catch(() => {
        window.open(fileUrl, '_blank')
      })
      .finally(() => {
        closeModal()
      })
  })
}