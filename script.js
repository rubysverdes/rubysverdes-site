// Menu toggle functionality
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Preparar mensagem para WhatsApp
        const whatsappMessage = `Olá! Me chamo ${name}. ${message}${phone ? ` Meu telefone é: ${phone}.` : ''}${email ? ` Meu email é: ${email}.` : ''}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Preparar email
        const emailSubject = encodeURIComponent(`Novo contato de ${name} - Site RubysVerdes`);
        const emailBody = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`);
        
        // Abrir WhatsApp
        window.open(`https://wa.me/5581986935525?text=${encodedMessage}`, '_blank');
        
        // Também abrir cliente de email (opcional)
        setTimeout(() => {
            window.open(`mailto:rubi.cordeiro@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
        }, 1000);
        
        // Feedback para o usuário
        alert('Obrigado pela sua mensagem! Você será redirecionado para o WhatsApp para concluir o contato.');
        
        // Limpar formulário
        this.reset();
    });
}