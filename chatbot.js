const input = document.querySelector(".chat-input")
const body = document.querySelector(".chat-body")

if (input && body) {
input.addEventListener("keydown", (event) => {
if (event.key !== "Enter") {
return
}

event.preventDefault()

const text = input.value.trim()

if (!text) {
return
}

const userMessage = document.createElement("p")
userMessage.innerText = "You: " + text
body.appendChild(userMessage)

const reply = document.createElement("p")
reply.innerText = "Assistant: Our team will contact you shortly."
body.appendChild(reply)

body.scrollTop = body.scrollHeight
input.value = ""
})
}
