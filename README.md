# Hill County - Residential Development Landing Page 🏡

A modern, interactive landing page designed for **Hill County**, the newly launched residential development by the **Pragna Group**. Situated in the rapidly growing hub of Bhongir, this project highlights premium amenities and a community-centric lifestyle.

![Languages](https://img.shields.io/badge/CSS-47.3%25-purple)
![Languages](https://img.shields.io/badge/HTML-32.2%25-orange)
![Languages](https://img.shields.io/badge/JavaScript-20.5%25-yellow)
![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)

## 📖 About The Project

The Hill County landing page is built to visually immerse potential buyers in the community before they ever visit the site. By utilizing GSAP (GreenSock Animation Platform), the site features smooth, high-end scroll animations that guide users through the project's amenities—including the clubhouse, swimming pool, and parks—while providing easy access to downloadable masterplans and brochures.

## ✨ Key Features & Highlights

* **Advanced UI Animations:** Smooth scrolling, reveal effects, and interactive elements powered by custom `gsap-animations.js`.
* **Amenity Spotlights:** Dedicated visual sections for the clubhouse, pool, park, and grand entrance.
* **Downloadable Assets:** Direct links for users to download the official `brochure.pdf` and `layout.pdf`.
* **Clean Code Architecture:** Logic is cleanly separated into distinct styling (`styles.css`, `animations.css`) and scripting (`app.js`, `gsap-animations.js`) files.
* **Automated Deployment:** CI/CD pipeline integrated via GitHub Actions (`static.yml`) for seamless deployment to GitHub Pages.

## 🛠️ Built With

* **HTML5** (32.2%) - Semantic document structuring
* **CSS3** (47.3%) - Responsive design, flexbox/grid layouts, and native keyframes
* **JavaScript** (20.5%) - Core logic and DOM manipulation
* **GSAP** - Industry-standard library for high-performance animations

## 📁 Repository Structure

```text
/
├── .github/workflows/
│   └── static.yml           # GitHub Pages automated deployment configuration
├── animations.css           # Native CSS transitions and keyframes
├── app.js                   # Main application logic and event listeners
├── brochure.pdf             # Downloadable project brochure
├── clubhouse.jpg            # Asset: Clubhouse section
├── entrance.jpg             # Asset: Grand entrance
├── gsap-animations.js       # Complex scroll and UI animations via GSAP
├── hero.jpg                 # Asset: Hero section background
├── index.html               # Main HTML document
├── layout.pdf               # Downloadable layout plan
├── location.jpg             # Asset: Location map/image
├── logo.jpeg                # Asset: Brand logo
├── masterplan.jpg           # Asset: Project masterplan
├── park.jpg                 # Asset: Parks and greenery
├── pool.jpg                 # Asset: Swimming pool amenity
└── styles.css               # Core custom stylesheet
