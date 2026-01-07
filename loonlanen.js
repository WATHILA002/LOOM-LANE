const header = document.querySelector(".main-header");
let lastScroll = 0;
let scrollTimeout;

function showHeader() {
  header.classList.remove("hide-header");
}

function hideHeader() {
  header.classList.add("hide-header");
}

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;


  if (currentScroll > lastScroll) {
    hideHeader();
  }

  else {
    showHeader();
  }

  lastScroll = currentScroll;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    showHeader();
  }, 200);
});

// mouse / touch interaction
window.addEventListener("mousemove", showHeader);
window.addEventListener("touchstart", showHeader);

const slider = document.querySelector('.slider');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const slideTimer = 5000;

next.addEventListener('click', () => {
  slider.scrollBy({ left: 300, behavior: 'smooth' });
});

prev.addEventListener('click', () => {
  slider.scrollBy({ left: -300, behavior: 'smooth' });
});

setInterval(() => {
  slider.scrollBy({ left: 300, behavior: 'smooth' });
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
    slider.scrollTo({ left: 0, behavior: 'smooth' });
  }
}, slideTimer);

/* chatbot creation */   /* chatbot popup logic */
const chatbotToggle1 = document.getElementById("chatbotToggle1");
const chatbot1 = document.getElementById("chatbot1");
const closeChat1 = document.getElementById("closeChat1");

chatbotToggle1.addEventListener("click", () => {
  chatbot1.style.display = "flex";
});

closeChat1.addEventListener("click", () => {
  chatbot1.style.display = "none";
});

/* quesstion and aswers */
const qa1 = {
  "hello": "Hello! Welcome to our Home Décor store 👋",
  "hi": "Hi there! How can I help you today?",
  "hii": "hi there! How can I help you today?",
  "hey": "Hey! Looking to beautify your home?",
  "good morning": "Good morning! Hope you have a lovely day 🌞",
  "good evening": "Good evening! How can I assist you?",
  "what is the time now": new Date().toLocaleTimeString(),
  "what time is it": new Date().toTimeString().split(" ")[0],
  "what is the date today": new Date().toLocaleDateString(),
  "what date is today": new Date().toDateString(),
  "bye": "Goodbye! Have a beautiful day 🏡",
  "goodbye": "See you again soon! Take care.",
  "thank you": "You're very welcome 😊",
  "thanks": "Happy to help!",
  "what is contact number": "0772345678",
  "How to contact you": "visit our contact page",
  "can you help me": "Of course! Ask me anything about our home décor products.",
  "what is home decor": "Home décor includes decorative items used to enhance the beauty of your living space.",
  "do you sell home decor items": "Yes! We offer a wide range of stylish home décor items.",
  "are your products original": "Yes, all our décor products are 100% authentic.",
  "are your products handmade": "Many of our décor items are handcrafted by skilled artisans.",
  "is home decor a good gift": "Absolutely! Home décor makes a thoughtful and elegant gift 🎁",
  "do you sell luxury decor": "Yes! We specialize in premium and luxury décor items.",
  "do you sell modern decor": "Yes! We offer modern, minimalist, and contemporary décor styles.",
  "do you sell traditional decor": "Yes, we have beautiful traditional and ethnic décor.",
  "do you sell wall decor": "Yes! Wall art, hangings, and panels are available.",
  "do you sell table decor": "Yes! Centerpieces, vases, and sculptures are available.",
  "do you sell decor online": "Yes! You can order all décor items online 🛒",
  "do you deliver": "Yes, we offer island-wide delivery across Sri Lanka 🇱🇰",
  "how long delivery take": "Delivery usually takes 2–4 working days.",
  "do you offer free delivery": "Free delivery is available on selected orders.",
  "what payment methods accepted": "We accept cash, cards, and online payments 💳",
  "can decor be returned": "Yes, unused items can be returned.",
  "is decor safe for kids": "Yes, but delicate items should be placed carefully.",
  "is decor durable": "Yes, our décor items are made with high-quality materials.",
  "why choose your decor": "Because we offer quality, elegance, and unique designs ✨",
  "do you sell wooden crafts": "Yes! We offer beautiful handmade wooden décor.",
  "what is wooden decor": "Wooden décor items are made from natural wood for a warm and elegant look.",
  "is wooden decor durable": "Yes, wooden décor is strong and long-lasting.",
  "is wooden decor eco friendly": "Yes, wooden décor is eco-friendly and sustainable 🌿",
  "do you sell wooden wall art": "Yes! Hand-carved wooden wall art is available.",
  "do you sell wooden statues": "Yes, artistic wooden statues and sculptures are available.",
  "do you sell wooden candle holders": "Yes! Elegant wooden candle holders are available.",
  "do you sell wooden trays": "Yes! Decorative wooden trays are available.",
  "do you sell wooden bowls": "Yes! Artistic wooden bowls are available.",
  "does wood attract insects": "Our wooden items are treated to prevent insects.",
  "can wooden decor crack": "Properly treated wood resists cracking.",
  "can wooden decor be polished": "Yes, polishing keeps it shiny and fresh.",
  "is wooden decor heavy": "Some items are light, others are solid and heavy.",
  "does wooden decor suit modern homes": "Yes! Wooden décor blends beautifully with modern interiors.",
  "is wooden decor good for gifting": "Yes! Wooden décor is timeless and elegant 🎁",
  "how to clean wooden decor": "Use a dry or slightly damp soft cloth.",
  "can wooden decor fade": "Minimal fading if kept away from direct sunlight.",
  "do you sell rustic decor": "Yes! Rustic wooden décor is available.",
  "is wooden decor natural": "Yes, wood is a natural material 🌳",
  "do you sell wooden clocks": "Yes! Decorative wooden clocks are available ⏰",
  "do you sell porcelain items": "Yes! We offer elegant porcelain décor items.",
  "what is porcelain decor": "Porcelain décor is made from fine ceramic material with a luxury finish.",
  "is porcelain fragile": "Yes, porcelain is delicate and should be handled carefully.",
  "do you sell porcelain vases": "Yes! Premium porcelain vases are available.",
  "is porcelain waterproof": "Yes, porcelain is water-resistant.",
  "can porcelain be washed": "Yes, gently wash using mild soap and water.",
  "do you sell ceramic decor": "Yes! Decorative ceramic décor is available.",
  "is ceramic same as porcelain": "Porcelain is finer and more delicate than ceramic.",
  "does porcelain fade": "No, porcelain colors remain vibrant for years.",
  "do you sell porcelain figurines": "Yes! Artistic porcelain figurines are available.",
  "is porcelain good for gifting": "Yes! Porcelain décor makes a classy gift 🎁",
  "is porcelain luxury decor": "Yes, porcelain is considered luxury décor.",
  "do you sell white porcelain items": "Yes! Classic white porcelain items are available.",
  "do you sell colored porcelain": "Yes! We offer various colors and designs.",
  "can porcelain break easily": "It can break if dropped or mishandled.",
  "how to clean porcelain decor": "Use a soft cloth with mild soap.",
  "is porcelain heat resistant": "It handles moderate heat well.",
  "does porcelain stain": "No, porcelain is stain-resistant.",
  "do you sell ceramic bowls": "Yes! Decorative ceramic bowls are available.",
  "is porcelain timeless": "Yes! Porcelain décor never goes out of style.",
  "do you sell flower decor": "Yes! Artificial and dried flower décor is available 🌸",
  "are your flowers real": "We offer high-quality artificial flowers.",
  "do artificial flowers look real": "Yes! They look very natural and elegant.",
  "do flowers need water": "No, artificial flowers need no water.",
  "do you sell flower vases": "Yes! Decorative vases are available.",
  "are flowers washable": "Yes, gently clean with water or dust.",
  "do flowers suit living room": "Yes! Flower décor adds freshness and beauty.",
  "do you sell candles": "Yes! Decorative candles are available 🕯️",
  "do you sell candle holders": "Yes! Stylish candle holders are available.",
  "do you sell lamps": "Yes! Decorative lamps and accent lighting are available 💡",
  "do you sell mirrors": "Yes! Decorative mirrors are available.",
  "do you sell photo frames": "Yes! Elegant photo frames are available.",
  "do you sell wall clocks": "Yes! Modern and classic clocks are available.",
  "do you sell planters": "Yes! Decorative indoor planters are available.",
  "do you sell glass decor": "Yes! Premium glass décor items are available.",
  "do you sell metal decor": "Yes! Modern metal décor designs are available.",
  "is decor good for weddings": "Yes! Perfect décor for weddings and events 💍",
  "is decor good for housewarming": "Yes! Home décor is perfect for housewarming gifts 🏠",
  "do you sell decor sets": "Yes! Matching décor sets are available.",
  "is decor worth investment": "Yes! Décor adds beauty and value to your home ✨"
};

/* chat logic */
const sendBtn1 = document.getElementById("sendBtn1");
const userInput1 = document.getElementById("userInput1");
const chatBody1 = document.getElementById("chatBody1");

sendBtn1.addEventListener("click", sendMessage1);
userInput1.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage1();
});

function sendMessage1() {
  const text = userInput1.value.trim().toLowerCase();
  if (text === "") return;

  appendMessage1(text, "user");
  userInput1.value = "";

  const thinkingMsg = document.createElement("div");
  thinkingMsg.classList.add("thinking1");
  thinkingMsg.textContent = "Thinking...";
  chatBody1.appendChild(thinkingMsg);
  chatBody1.scrollTop = chatBody1.scrollHeight;

  setTimeout(() => {
    thinkingMsg.remove();
    const reply = qa1[text] || "🤔 Sorry, I don't know that yet.";
    appendMessage1(reply, "bot");
  }, 1500);
}

function appendMessage1(msg, sender) {
  const div = document.createElement("div");
  div.classList.add("chat-message1", sender === "user" ? "user-message1" : "bot-message1");
  div.textContent = msg;
  chatBody1.appendChild(div);
  chatBody1.scrollTop = chatBody1.scrollHeight;
}

$(function () {
  console.log("CDN working");
});


/* google search function */
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchGoogle() {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please type something to search!");
    return;
  }

  const googleURL = "https://www.google.com/search?q=" + encodeURIComponent(query);
  window.open(googleURL, "_blank");
}

searchBtn.addEventListener("click", searchGoogle);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchGoogle();
});

document.getElementById("questionForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  fetch("submit_question.php", { method: "POST", body: formData })
    .then(res => res.text())
    .then(data => {
      if (data.trim() === "success") {
        document.getElementById("formMessage").style.display = "block";
        this.reset();
      } else {
        alert("Something went wrong. Try again.");
      }
    })
    .catch(err => alert("Error sending message."));
});



