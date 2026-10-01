const travelMenu = document.querySelector('.nav-travel');
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  document.querySelector('.nav').classList.toggle('nav-open', !open);
});
document.querySelectorAll('.nav a[href^="../#"]').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded','false');
  document.querySelector('.nav').classList.remove('nav-open');
  if (travelMenu) travelMenu.removeAttribute('open');
}));
document.querySelector('#message-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = data.get('subject') || 'Portfolio inquiry';
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  window.location.href = `mailto:sahandkhoda@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
