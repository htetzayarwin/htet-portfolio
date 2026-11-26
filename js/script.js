
/* =========================================
   HTET.DEV - JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // MOBILE NAVIGATION

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("open");

            menuToggle.classList.toggle("open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");
                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // CURRENT YEAR

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // SCROLL REVEAL ANIMATION

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ACTIVE NAVIGATION

    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${currentId}`) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});
// Language Switcher
const languageSwitch = document.getElementById("language-switch");

// Default language
let currentLanguage = "en";

// Language translations
const translations = {
    en: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact"
    },

    ja: {
        home: "ホーム",
        about: "自己紹介",
        skills: "スキル",
        projects: "プロジェクト",
        contact: "お問い合わせ"
    }
};


// Language Switcher
const languageSwitch = document.getElementById("language-switch");

// Current language
let currentLanguage = "en";

// Translation dictionary
const translations = {
    en: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        certifications: "Certifications",
        journal: "Lab Journal",
        contact: "Contact"
    },

    ja: {
        home: "ホーム",
        about: "自己紹介",
        skills: "スキル",
        projects: "プロジェクト",
        certifications: "資格",
        journal: "学習記録",
        contact: "お問い合わせ"
    }
};

// Change website language
languageSwitch.addEventListener("click", () => {

    // Toggle between English and Japanese
    currentLanguage = currentLanguage === "en" ? "ja" : "en";

    // Update all translated elements
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        element.textContent = translations[currentLanguage][key];
    });

    // Update button label
    languageSwitch.textContent = currentLanguage === "en" ? "JP" : "EN";
});

