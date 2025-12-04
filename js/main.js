const journeys = [
  { id: 'tokyo', title: 'Tokyo Reflection', desc: 'Urban mindfulness in neon streets.', img: 'images/tokyo.jpg', points: 100 },
  { id: 'fuji', title: 'Mount Fuji Walk', desc: 'A breathing journey with mountain views.', img: 'images/mount-fuji.jpg', points: 150 },
  { id: 'kyoto', title: 'Kyoto Temples', desc: 'Reflect at ancient temples and gardens.', img: 'images/mount-fuji.jpg', points: 120 }
];

function renderDestinations(){
  const el = document.getElementById('destinations');
  if(!el) return;
  el.innerHTML = journeys.map(j => `
    <article class="card" role="article" aria-labelledby="${j.id}-h">
      <img src="${j.img}" alt="${j.title}" loading="lazy">
      <h3 id="${j.id}-h">${j.title}</h3>
      <p>${j.desc}</p>
      <p><strong>Points:</strong> ${j.points}</p>
    </article>
  `).join('');
}

function renderJourneyList(){
  const list = document.getElementById('journey-list');
  if(!list) return;

  let score = Number(localStorage.getItem('ej_score') || 0);
  document.getElementById('scoreValue').textContent = score;

  list.innerHTML = journeys.map(j => `
    <div class="journey-card" data-id="${j.id}">
      <h3>${j.title}</h3>
      <p>${j.desc}</p>
      <p>Points per completion: ${j.points}</p>
      <button class="btn start-btn" data-id="${j.id}">Start</button>
    </div>
  `).join('');

  document.querySelectorAll('.start-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.getAttribute('data-id');
      startJourneyById(id);
    });
  });
}

function startJourneyById(id){
  const journey = journeys.find(j => j.id === id);
  if(!journey) return;
  const orig = document.querySelector(`.journey-card[data-id="${id}"]`);
  const output = document.createElement('div');
  output.setAttribute('role','status');
  orig.appendChild(output);

  let dots = 0;
  output.textContent = `Preparing${'.'.repeat(dots)}`;
  const t = setInterval(() => {
    dots = (dots + 1) % 4;
    output.textContent = `Preparing${'.'.repeat(dots)}`;
  }, 500);

  setTimeout(() => {
    clearInterval(t);
    output.textContent = `Completed! You earned ${journey.points} points.`;
    let score = Number(localStorage.getItem('ej_score') || 0);
    score += journey.points;
    localStorage.setItem('ej_score', String(score));
    const scoreEl = document.getElementById('scoreValue');
    if(scoreEl) scoreEl.textContent = score;
  }, 3000); 
}

function populateJourneySelect(){
  const sel = document.getElementById('journey');
  if(!sel) return;
  sel.innerHTML = `<option value="" disabled selected>Select a journey...</option>` + journeys.map(j => `
    <option value="${j.title}">${j.title}</option>
  `).join('');
}

function insertYears(){
  const y = new Date().getFullYear();
  document.getElementById('year') && (document.getElementById('year').textContent = y);
  document.getElementById('year2') && (document.getElementById('year2').textContent = y);
  document.getElementById('year3') && (document.getElementById('year3').textContent = y);
}

document.addEventListener('DOMContentLoaded', () => {
  renderDestinations();
  renderJourneyList();
  populateJourneySelect();
  insertYears();
});
