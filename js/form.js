document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if(!form) return;

  localStorage.setItem('ej_journeys', JSON.stringify(journeys));

  form.addEventListener('submit', (e) => {
   
  });
});
