const content = window.portfolioContent;
const expertiseList = document.querySelector('#expertise-list');
const expertiseIcons = [
  /* DATA SCIENCE & AI — neural network */
  '<circle cx="10" cy="12" r="3"/><circle cx="24" cy="7" r="3"/><circle cx="38" cy="14" r="3"/><circle cx="15" cy="29" r="3"/><circle cx="31" cy="34" r="3"/><path d="m13 11 8-3m6 1 8 3M12 14l2 12m4 3 10 4m5-19-2 16M18 28l4-18"/>',

  /* SIGNAL PROCESSING — waveform */
  '<path d="M5 24h8l4-12 7 25 6-20 4 7h9M5 42h38"/>',

  /* MEDICAL IMAGING — scanner */
  '<path d="M8 8h8m16 0h8M8 40h8m16 0h8M8 8v8m0 16v8m32-32v8m0 16v8"/><circle cx="24" cy="24" r="11"/><circle cx="24" cy="24" r="5"/><path d="M24 18v12m-6-6h12"/>',

  /* HEALTHCARE DATA SYSTEMS — database */
  '<ellipse cx="24" cy="10" rx="15" ry="6"/><path d="M9 10v24c0 3 7 6 15 6s15-3 15-6V10M9 22c0 3 7 6 15 6s15-3 15-6"/>',

  /* SOFTWARE & ENGINEERING — code */
  '<rect x="7" y="9" width="34" height="30" rx="1"/><path d="M7 16h34m-23 8-5 4 5 4m8-8 5 4-5 4m-2-10-3 12"/>',

  /* BIOMEDICAL SYSTEMS — human + medical cross */
  '<circle cx="24" cy="10" r="5"/><path d="M14 42c0-8 4-14 10-14s10 6 10 14M24 15v10m-7 1 7 5 7-5M39 12v12m-6-6h12"/>'
].map(
  (paths) =>
    `<svg class="expertise-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`
);

expertiseList.innerHTML = content.expertise.map(
  ([title, text], i) =>
    `<article class="expertise-card">${expertiseIcons[i]}<h3>${title}</h3><p>${text}</p></article>`
).join('');

document.querySelector('#project-list').innerHTML = content.projects.map((project, i) => `<article class="project-card project-${i+1}"><div class="project-visual"><img src="${project.image}" alt="${project.alt}" loading="lazy" /><span class="visual-label">${project.number} — ${project.category}</span></div><div class="project-copy"><p class="project-meta">PROJECT&nbsp; ${project.number} <i>${project.category}</i></p><h3>${project.title}</h3><p class="project-lead">${project.lead}</p><div class="project-details" id="project-detail-${i}"><p>${project.description}</p><div class="tag-list">${project.tags.map(tag=>`<span>${tag}</span>`).join('')}</div></div><button class="project-toggle" aria-expanded="false" aria-controls="project-detail-${i}">EXPLORE PROJECT <span>↗</span></button></div></article>`).join('');

document.querySelector('#principles').innerHTML = content.principles.map(([title,text],i)=>`<article class="principle"><span>0${i+1}</span><div><h3>${title}</h3><p>${text}</p></div><b>↗</b></article>`).join('');
document.querySelector('#experience-list').innerHTML = content.experience.map(item=>`<article class="experience-item"><div class="experience-type">${item.type}<span>${item.status}</span></div><div class="experience-content"><h3>${item.title}</h3><p class="organization">${item.organization}</p><p>${item.description}</p></div><span class="experience-arrow" aria-hidden="true">↗</span></article>`).join('');
document.querySelector('#capability-grid').innerHTML = content.capabilities.map(([title,skills],i)=>`<article class="capability"><span>0${i+1}</span><h3>${title}</h3><p>${skills}</p></article>`).join('');
document.querySelector('.education-kicker').textContent = `${content.educationDates} · MASTER OF SCIENCE`;
document.querySelector('.contact-missing').outerHTML = `<a class="contact-email" href="mailto:${content.contactEmail}">${content.contactEmail} <span>↗</span></a>`;
document.querySelector('.missing-note').textContent = 'Email listed on Sahand’s resume.';

document.querySelectorAll('.project-toggle').forEach(button => button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  const details = button.closest('.project-card').querySelector('.project-details');
  button.setAttribute('aria-expanded', String(!expanded));
  button.closest('.project-card').classList.toggle('is-open', !expanded);
  details.setAttribute('aria-hidden', String(expanded));
  details.style.maxHeight = expanded ? '0px' : `${details.scrollHeight}px`;
  button.querySelector('span').textContent = expanded ? '↗' : '↘';
  button.firstChild.textContent = expanded ? 'EXPLORE PROJECT ' : 'CLOSE DETAILS ';
}));
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('.nav').classList.toggle('nav-open', !expanded);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); document.querySelector('.nav').classList.remove('nav-open');
}));
const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if (!visible) return;
  sectionLinks.forEach(link => {
    if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
}, {rootMargin:'-30% 0px -55% 0px', threshold:[0,.1,.25,.5]});
document.querySelectorAll('#home,#about,#expertise,#projects,#experience,#contact').forEach(section=>sectionObserver.observe(section));

const hero = document.querySelector('#home');
const heroBackdrop = hero?.querySelector('.hero-wash');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let parallaxFrame = 0;
const updateHeroParallax = () => {
  parallaxFrame = 0;
  if (!heroBackdrop || prefersReducedMotion.matches) return;
  const heroTop = hero.getBoundingClientRect().top;
  const offset = -heroTop * 0.18;
  heroBackdrop.style.setProperty('--hero-parallax-y', `${offset.toFixed(1)}px`);
};
const requestHeroParallax = () => {
  if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
};
window.addEventListener('scroll', requestHeroParallax, { passive: true });
window.addEventListener('resize', requestHeroParallax, { passive: true });
prefersReducedMotion.addEventListener?.('change', requestHeroParallax);
updateHeroParallax();
