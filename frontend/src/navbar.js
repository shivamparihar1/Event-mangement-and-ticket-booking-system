window.addEventListener('DOMContentLoaded', () => {
  // Set active link logic
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
      // Find the active link based on href
      const linkPath = new URL(link.href, window.location.origin).pathname;
      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
      }

      // Subtle magnetic drift effect
      link.addEventListener('mousemove', (e) => {
          const { offsetX, offsetY, target } = e;
          const { clientWidth, clientHeight } = target;
          const xPos = (offsetX / clientWidth) - 0.5;
          const yPos = (offsetY / clientHeight) - 0.5;
          
          target.style.transform = `translate(${xPos * 6}px, ${yPos * 4}px)`;
      });

      link.addEventListener('mouseleave', (e) => {
          e.target.style.transform = `translate(0, 0)`;
      });
  });
});
