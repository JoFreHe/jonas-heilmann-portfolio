(() => {
  'use strict';
  const small = window.matchMedia('(max-width: 700px)');
  const hero = document.querySelector('.hero');
  hero.dataset.scSpan = small.matches ? '1.4' : '1.7';
  // The engine is copied unchanged. All project behaviour lives in this file.
  if (window.ScrollCraft) ScrollCraft.mount(document.body);

  const sections = [...document.querySelectorAll('[data-section]')];
  const links = [...document.querySelectorAll('[data-index]')];
  let scheduled = false;
  function updateIndex() {
    scheduled = false;
    const line = innerHeight * .42;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section;
    }
    const id = current.dataset.section;
    document.body.dataset.ground = ['foto', 'web'].includes(id) ? 'paper' : 'dark';
    links.forEach(link => {
      if (link.dataset.index === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', () => { if (!scheduled) {scheduled = true; requestAnimationFrame(updateIndex);} }, {passive:true});
  addEventListener('resize', updateIndex, {passive:true});
  updateIndex();

  const film = document.getElementById('showreel');
  const remember = document.getElementById('remember-frame');
  const savedPanel = document.getElementById('saved-moment');
  const savedImage = document.getElementById('saved-image');
  const savedTime = document.getElementById('saved-time');
  const frameStatus = document.getElementById('frame-status');
  const badge = document.getElementById('index-saved');
  let saved = null;
  const timecode = seconds => {
    const total = Math.max(0, Math.floor(seconds || 0));
    return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');
  };
  film.addEventListener('loadeddata', () => { remember.disabled = false; });
  film.addEventListener('seeking', () => { remember.disabled = true; });
  film.addEventListener('seeked', () => { remember.disabled = film.readyState < 2; });
  remember.addEventListener('click', () => {
    const hasFrame = film.readyState >= 2 && film.videoWidth > 0;
    if (!hasFrame) { frameStatus.textContent = 'Der Filmmoment wird noch geladen. Versuche es gleich noch einmal.'; return; }
    const seconds = film.currentTime;
    let image = document.querySelector('.showreel-frame img').src;
    if (hasFrame) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = Math.round(480 * film.videoHeight / film.videoWidth);
        canvas.getContext('2d').drawImage(film, 0, 0, canvas.width, canvas.height);
        image = canvas.toDataURL('image/jpeg', .78);
      } catch { image = document.querySelector('.showreel-frame img').src; }
    }
    saved = {seconds, time:timecode(seconds)};
    savedImage.src = image;
    savedTime.textContent = 'Showreel bei ' + saved.time;
    savedPanel.hidden = false;
    badge.hidden = false;
    remember.innerHTML = '<span aria-hidden="true">✓</span> Moment gemerkt';
    frameStatus.textContent = 'Filmmoment bei ' + saved.time + ' für deine Anfrage gemerkt. Du findest ihn im Bereich Anfrage.';
    document.querySelector('input[name="topic"][value="Filmproduktion"]').checked = true;
  });
  document.getElementById('remove-moment').addEventListener('click', () => {
    saved = null;
    savedPanel.hidden = true;
    badge.hidden = true;
    savedImage.removeAttribute('src');
    remember.innerHTML = '<span aria-hidden="true">＋</span> Moment merken';
    frameStatus.textContent = 'Der gemerkte Filmmoment wurde aus deiner Anfrage entfernt.';
    document.querySelector('input[name="topic"][value="Filmproduktion"]').focus();
  });

  document.querySelectorAll('[data-request]').forEach(link => link.addEventListener('click', () => {
    const matching = [...document.querySelectorAll('input[name="topic"]')].find(input => input.value === link.dataset.request);
    if (matching) matching.checked = true;
  }));
  const form = document.getElementById('contact-form');
  document.getElementById('contact-fields').disabled = false;
  const validationFields = [
    { input: document.getElementById('contact-name'), error: document.getElementById('name-error') },
    { input: document.getElementById('contact-email'), error: document.getElementById('email-error') },
    { input: document.getElementById('contact-message'), error: document.getElementById('message-error') }
  ];
  function validationMessage(input) {
    const validity = input.validity;
    if (validity.valueMissing) return 'Dieses Feld ist erforderlich.';
    if (validity.typeMismatch) return 'Bitte gib eine gültige E-Mail-Adresse ein.';
    if (validity.tooShort) return 'Bitte beschreibe deine Idee mit mindestens 10 Zeichen.';
    if (validity.tooLong) return 'Der Text ist zu lang.';
    return 'Bitte überprüfe deine Eingabe.';
  }
  function updateInlineError(field) {
    if (field.input.validity.valid) {
      field.input.removeAttribute('aria-invalid');
      field.error.textContent = '';
      field.error.hidden = true;
      return;
    }
    field.input.setAttribute('aria-invalid', 'true');
    field.error.textContent = validationMessage(field.input);
    field.error.hidden = false;
  }
  validationFields.forEach(field => {
    field.input.addEventListener('invalid', () => updateInlineError(field));
    field.input.addEventListener('blur', () => {
      if (field.input.value || field.input.validity.valueMissing) updateInlineError(field);
    });
    field.input.addEventListener('input', () => {
      if (field.input.hasAttribute('aria-invalid')) updateInlineError(field);
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      validationFields.forEach(field => { if (!field.input.validity.valid) updateInlineError(field); });
      return;
    }
    const data = new FormData(form);
    const topics = data.getAll('topic').join(', ') || 'Erste Projektidee';
    const reference = saved ? '\n\nAls Bezug für die Stimmung: dein Showreel bei ' + saved.time + '.' : '';
    const body = 'Hallo Jonas,\n\n' + data.get('message') + reference + '\n\nMein Projekt: ' + topics + '\n\nViele Grüße\n' + data.get('name') + '\n' + data.get('email');
    const mailto = 'mailto:jofreheil@icloud.com?subject=' + encodeURIComponent('Projektanfrage: ' + topics) + '&body=' + encodeURIComponent(body);
    document.getElementById('form-status').textContent = 'Dein E-Mail-Programm wird geöffnet. Bitte prüfe den Entwurf und sende ihn dort ab. Falls sich kein Programm öffnet, nutze die E-Mail-Adresse unten.';
    window.location.href = mailto;
  });
})();
