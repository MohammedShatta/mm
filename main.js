document.addEventListener("DOMContentLoaded", function () {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px",
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, observerOptions);
    // Observe project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      observer.observe(card);
    });
    // Observe skill bars
    document.querySelectorAll(".skill-bar").forEach((bar) => {
      observer.observe(bar);
    });
    // Add stagger effect to tech icons
    document.querySelectorAll(".tech-icon").forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.1}s`;
    });
    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      if (menuToggle.querySelector("i").classList.contains("ri-menu-line")) {
        menuToggle.querySelector("i").classList.remove("ri-menu-line");
        menuToggle.querySelector("i").classList.add("ri-close-line");
      } else {
        menuToggle.querySelector("i").classList.remove("ri-close-line");
        menuToggle.querySelector("i").classList.add("ri-menu-line");
      }
    });
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        menuToggle.querySelector("i").classList.remove("ri-close-line");
        menuToggle.querySelector("i").classList.add("ri-menu-line");
      });
    });
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    function setActiveLink() {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    }
    window.addEventListener("scroll", setActiveLink);
    // Back to top button
    const backToTopButton = document.getElementById("back-to-top");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove("opacity-0", "invisible");
        backToTopButton.classList.add("opacity-100", "visible");
      } else {
        backToTopButton.classList.remove("opacity-100", "visible");
        backToTopButton.classList.add("opacity-0", "invisible");
      }
    });
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    // Particles animation
    const particlesContainer = document.querySelector(".particles-container");
    const particlesCount = 50;
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      const size = Math.random() * 5 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 10;
      const opacity = Math.random() * 0.5 + 0.1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity;
      particle.style.animation = `float ${animationDuration}s infinite alternate ease-in-out`;
      particlesContainer.appendChild(particle);
    }
    // Typing effect
    const typingText = document.querySelector(".typing-text");
    const phrases = [
      "Front-End Developer",
      "UI Enthusiast",
      "JavaScript Expert",
      "React Developer",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }
      setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 1000);
    // Skill bars animation
    const skillBars = document.querySelectorAll(".skill-progress");
    function animateSkillBars() {
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });
    }
    // Trigger skill bars animation when scrolled into view
    const aboutSection = document.getElementById("about");
    function checkScroll() {
      const aboutSectionTop = aboutSection.offsetTop;
      const aboutSectionHeight = aboutSection.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      if (
        scrollY > aboutSectionTop - windowHeight + 300 &&
        scrollY < aboutSectionTop + aboutSectionHeight
      ) {
        animateSkillBars();
        window.removeEventListener("scroll", checkScroll);
      }
    }
    window.addEventListener("scroll", checkScroll);
    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
          btn.classList.remove("active", "bg-primary", "text-white");
          btn.classList.add("text-gray-300");
        });
        // Add active class to clicked button
        this.classList.add("active", "bg-primary", "text-white");
        this.classList.remove("text-gray-300");
        const filter = this.getAttribute("data-filter");
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
    // Form validation
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");
      const consentInput = document.getElementById("consent");
      // Simple validation
      let isValid = true;
      if (nameInput.value.trim() === "") {
        isValid = false;
        nameInput.classList.add("border-red-500");
      } else {
        nameInput.classList.remove("border-red-500");
      }
      if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
        isValid = false;
        emailInput.classList.add("border-red-500");
      } else {
        emailInput.classList.remove("border-red-500");
      }
      if (subjectInput.value.trim() === "") {
        isValid = false;
        subjectInput.classList.add("border-red-500");
      } else {
        subjectInput.classList.remove("border-red-500");
      }
      if (messageInput.value.trim() === "") {
        isValid = false;
        messageInput.classList.add("border-red-500");
      } else {
        messageInput.classList.remove("border-red-500");
      }
      if (!consentInput.checked) {
        isValid = false;
        document
          .querySelector(".custom-checkbox")
          .classList.add("border-red-500");
      } else {
        document
          .querySelector(".custom-checkbox")
          .classList.remove("border-red-500");
      }
      if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML =
          '<i class="ri-loader-4-line animate-spin mr-2"></i> Sending...';
        submitButton.disabled = true;
        setTimeout(() => {
          contactForm.reset();
          submitButton.innerHTML =
            '<i class="ri-check-line mr-2"></i> Message Sent!';
          setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
          }, 3000);
        }, 2000);
      }
    });
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    // CV Download Modal
    const downloadCvBtn = document.getElementById("download-cv-btn");
    const cvModal = document.getElementById("cv-modal");
    const closeCvModal = document.getElementById("close-cv-modal");
    const downloadPdfBtn = document.getElementById("download-pdf");
    const downloadDocxBtn = document.getElementById("download-docx");
    const sendEmailBtn = document.getElementById("send-email");
    const emailInput = document.getElementById("email-input");
    downloadCvBtn.addEventListener("click", (e) => {
      e.preventDefault();
      cvModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
    closeCvModal.addEventListener("click", () => {
      cvModal.classList.add("hidden");
      document.body.style.overflow = "";
    });
    cvModal.addEventListener("click", (e) => {
      if (e.target === cvModal) {
        cvModal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
    downloadPdfBtn.addEventListener("click", () => {
      const pdfUrl = "docx/Mohamed_Shata_CV.pdf";
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "docx/Mohamed_Shata_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    downloadDocxBtn.addEventListener("click", () => {
      const docxUrl = "docx/Mohamed_Shata_CV-1.docx";
      const link = document.createElement("a");
      link.href = docxUrl;
      link.download = "docx/Mohamed_Shata_CV-1.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    sendEmailBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      if (!email || !isValidEmail(email)) {
        emailInput.classList.add("border-red-500");
        return;
      }

      emailInput.classList.remove("border-red-500");
      const originalText = sendEmailBtn.innerHTML;
      sendEmailBtn.innerHTML =
        '<i class="ri-loader-4-line animate-spin mr-2"></i> Sending...';
      sendEmailBtn.disabled = true;

      setTimeout(() => {
        sendEmailBtn.innerHTML = '<i class="ri-check-line mr-2"></i> Sent!';
        emailInput.value = "";

        setTimeout(() => {
          sendEmailBtn.innerHTML = originalText;
          sendEmailBtn.disabled = false;
        }, 2000);
      }, 1500);
    });
    document.getElementById("preview-cv-btn").addEventListener("click", (e) => {
      e.preventDefault();
      window.open("Mohamed_Shata_CV.pdf", "_blank");
    });
  });