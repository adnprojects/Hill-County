const counters = document.querySelectorAll(".counter")

const animateCounter = (counter) => {
const target = Number(counter.dataset.target)

if (!target) {
counter.textContent = "0"
return
}

const startTime = performance.now()
const duration = 1400

const step = (currentTime) => {
const progress = Math.min((currentTime - startTime) / duration, 1)
const eased = 1 - Math.pow(1 - progress, 3)
counter.textContent = String(Math.round(target * eased))

if (progress < 1) {
window.requestAnimationFrame(step)
} else {
counter.textContent = String(target)
}
}

window.requestAnimationFrame(step)
}

if ("IntersectionObserver" in window) {
const counterObserver = new IntersectionObserver((entries, observer) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) {
return
}

animateCounter(entry.target)
observer.unobserve(entry.target)
})
}, {
threshold: 0.45
})

counters.forEach((counter) => counterObserver.observe(counter))
} else {
counters.forEach((counter) => animateCounter(counter))
}
