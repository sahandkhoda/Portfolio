const content = window.portfolioContent;
const expertiseList = document.querySelector('#expertise-list');
expertiseList.innerHTML = content.expertise.map(([title, text], i) => `<article class="expertise-item"><span class="item-number">0${i+1} <i>/ 05</i></span><h3>${title}</h3><p>${text}</p><span class="item-arrow">↗</span></article>`).join('');

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
