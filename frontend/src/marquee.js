document.addEventListener('DOMContentLoaded', () => {
    const handleCardHover = (card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            
            card.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) scale(1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
        });
    };

    // Add hover effects to all generated marquee cards
    const cards = document.querySelectorAll(".marquee-card");
    cards.forEach((card) => {
        handleCardHover(card);
    });

    // Add pause on hover for tracks so users can look at a specific card
    const tracks = document.querySelectorAll(".marquee-track");
    tracks.forEach((track) => {
        track.addEventListener("mouseenter", () => {
            track.style.animationPlayState = "paused";
        });
        track.addEventListener("mouseleave", () => {
            track.style.animationPlayState = "running";
        });
    });
});
