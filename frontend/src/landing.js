document.addEventListener("DOMContentLoaded", () => {
    
    // FEATURED SECTION 3D PARALLAX
    const plateCards = document.querySelectorAll(".plate-card");
    plateCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0)`;
        });
    });

    // WHY CHOOSE US 3D PARALLAX
    const carStage = document.getElementById("hero-dynamic-image");
    if(carStage) {
        document.addEventListener("mousemove", (e) => {
            const rect = carStage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (centerX - e.clientX) / 80;
            const deltaY = (centerY - e.clientY) / 80;
            carStage.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${deltaY}deg) scale(1.02)`;
        });
        document.addEventListener("mouseleave", () => {
            carStage.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
        });
    }

    // TESTIMONIALS 3D PLATEAU
    const plateauContainer = document.querySelector(".plateau-container");
    if(plateauContainer) {
        document.addEventListener("mousemove", (e) => {
            const cards = plateauContainer.querySelectorAll(".plateau-card");
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            cards.forEach((card, index) => {
                const depth = (index + 1) * 0.5;
                card.style.transform = `translate(${x * depth}px, ${y * depth}px) rotateX(${-y}deg) rotateY(${x}deg)`;
            });
        });
        plateauContainer.addEventListener("mouseleave", () => {
            const cards = plateauContainer.querySelectorAll(".plateau-card");
            cards.forEach((card) => {
                card.style.transform = "translate(0, 0) rotateX(0) rotateY(0)";
            });
        });
    }
});
