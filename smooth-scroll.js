if (window.Lenis) {
const lenis = new Lenis({
duration: 1.2
})

function raf(time) {
lenis.raf(time)
requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
}
