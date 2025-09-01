document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.getElementById('viewer');
  const menu = document.querySelector('.sidebar .menu');
  const items = Array.from(menu.querySelectorAll('.menu-item'));
  const contactsInner = document.querySelector('.contacts-inner');
  const fakeThumb = document.querySelector('.fake-scroll .thumb');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const suggestionsEl = document.getElementById('suggestions');
  const githubLink = document.getElementById('githubLink');
   const cvMenuItem = menu.querySelector('[data-key="contact"]');

  const sections = {
    home: '<div class="presentation fade-in"><h1>Hola, soy Raúl De Jesús Larios</h1><p>Desarrollador de videojuegos especializado en planificación y programación de plataformas interactivas. Me interesa especialmente crear experiencias multiplataforma con ideas claras y jugables.</p></div>',
    about: '<div class="section fade-in"><h2>About</h2><p>Titulación en Desarrollo de Aplicaciones Multiplataforma (DAM) y curso de especialización en Videojuegos y Realidad Virtual. Interés en programación orientada a objetos, Unity y desarrollo multiplataforma.</p></div>',
    projects: '<div class="section fade-in"><h2>Projects</h2><p>Proyectos académicos y personales: aplicaciones móviles, prototipos en Unity y pequeñas experiencias interactivas. Repositorios disponibles en GitHub.</p></div>',
    games: '<div class="section fade-in"><h2>Games</h2><p>Prototipos de mecánicas en Unity (C#), diseño de niveles básicos y trabajo en equipo para producción de pequeños títulos.</p></div>'
  };

  function normalizeHtml(s) {
    return String(s).replace(/\s+/g, ' ').trim();
  }

  function getVisibleContentElement() {
    return Array.from(viewer.children).find(
      c => c.dataset.origin === 'content' && c.style.display !== 'none'
    );
  }

  function setContent(html) {
    const visible = getVisibleContentElement();
    const newNorm = normalizeHtml(html);
    if (visible) {
      const visibleNorm = normalizeHtml(visible.innerHTML);
      if (visibleNorm === newNorm) return;
      visible.classList.remove('fade-in');
      visible.classList.add('fade-out');
      setTimeout(() => {
        Array.from(viewer.children).forEach(c => {
          if (c.dataset.origin === 'content') c.remove();
        });
        const wrapper = document.createElement('div');
        wrapper.dataset.origin = 'content';
        wrapper.innerHTML = html;
        viewer.insertBefore(wrapper, viewer.firstChild);
      }, 320);
    } else {
      Array.from(viewer.children).forEach(c => {
        if (c.dataset.origin === 'content') c.remove();
      });
      const wrapper = document.createElement('div');
      wrapper.dataset.origin = 'content';
      wrapper.innerHTML = html;
      viewer.insertBefore(wrapper, viewer.firstChild);
    }
  }

  function showInitial() {
    setContent(sections.home);
  }
  showInitial();

  // ---------------- CV OVERLAY (fuera del contenedor global)
  const pdfUrl = 'cv.pdf';
  const imgUrl = 'cv.png';
  let overlay = document.getElementById('cvOverlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cvOverlay';
    overlay.className = 'cv-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<div class="cv-modal" role="document">' +
      '<div class="cv-toolbar">' +
      '<div class="left"><button class="cv-button cv-close" aria-label="Cerrar CV">✕</button></div>' +
      '<div class="right"><a class="cv-download" href="' +
      pdfUrl +
      '" download>Descargar CV</a></div>' +
      '</div>' +
      '<img class="cv-image" src="' +
      imgUrl +
      '" alt="Currículum Vitae">' +
      '</div>';
    document.body.appendChild(overlay);
  }

  const overlayClose = overlay.querySelector('.cv-close');

  function openOverlay() {
    Array.from(viewer.children).forEach(c => {
      if (c.dataset.origin === 'content') c.style.display = 'none';
    });
    overlay.classList.add('open');
    items.forEach(i => i.classList.remove('active'));
    if (cvMenuItem) cvMenuItem.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    overlay.classList.remove('open');
    const contentChildren = Array.from(viewer.children).filter(
      c => c.dataset.origin === 'content'
    );
    if (contentChildren.length > 0) {
      contentChildren.forEach(c => {
        c.style.display = '';
      });
    } else {
      setContent(sections.home);
    }
    if (cvMenuItem) cvMenuItem.classList.remove('active');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeOverlay();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
  });

  // ---------------- MENÚ lateral
  items.forEach(item => {
    item.addEventListener('click', () => {
      const already = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!already) item.classList.add('active');
      const key = item.dataset.key;

      if (key === 'github') {
        window.open('https://github.com/rdjl-dev', '_blank');
        return;
      }
      if (key === 'contact') {
        openOverlay();
        return;
      }

      if (overlay.classList.contains('open')) closeOverlay();
      if (sections[key]) setContent(sections[key]);
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // ---------------- BUSCADOR
  const suggestions = [
    { type: 'search', label: 'Search the web (fictitious)' },
    { type: 'link', label: 'My GitHub', url: 'https://github.com/rdjl-dev' },
    { type: 'link', label: 'My LinkedIn', url: 'https://www.linkedin.com/in/ra%C3%BAl-de-jes%C3%BAs-larios/' }
  ];

  function renderSuggestions(q = '') {
    suggestionsEl.innerHTML = '';
    suggestions.forEach(s => {
      const div = document.createElement('div');
      div.className = 'suggestion';
      div.setAttribute('role', 'option');
      div.innerHTML =
        '<span>' +
        s.label +
        '</span><span>' +
        (s.type === 'link' ? '↗' : '🔎') +
        '</span>';
      div.addEventListener('click', () => {
        suggestionsEl.hidden = true;
        if (s.type === 'link') {
          window.open(s.url, '_blank');
        } else {
          const html =
            '<div class="section fade-in"><h2>Search results</h2><p>Results for "<strong>' +
            escapeHtml(q) +
            '</strong>" (fictitious)</p></div>';
          setContent(html);
        }
      });
      suggestionsEl.appendChild(div);
    });
    suggestionsEl.hidden = false;
  }

  searchInput.addEventListener('focus', () => {
    renderSuggestions(searchInput.value.trim());
  });
  searchInput.addEventListener('input', () => {
    renderSuggestions(searchInput.value.trim());
  });

  document.addEventListener('click', e => {
    if (
      !e.composedPath().includes(suggestionsEl) &&
      !e.composedPath().includes(searchInput)
    ) {
      suggestionsEl.hidden = true;
    }
  });

  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    const html =
      '<div class="section fade-in"><h2>Search results</h2><p>Results for "<strong>' +
      escapeHtml(q) +
      '</strong>" (fictitious)</p></div>';
    setContent(html);
    suggestionsEl.hidden = true;
  });

  // ---------------- SCROLL FAKE BAR
  function updateThumb() {
    const el = contactsInner;
    const trackHeight = el.clientHeight;
    const scrollHeight = el.scrollHeight;
    const visibleRatio = Math.max(0.05, Math.min(1, trackHeight / scrollHeight));
    const thumbHeight = Math.max(40, trackHeight * visibleRatio);
    const maxScroll = scrollHeight - trackHeight;
    const scrollTop = el.scrollTop;
    const thumbMaxMove = trackHeight - thumbHeight;
    const thumbPos =
      maxScroll > 0 ? (scrollTop / maxScroll) * thumbMaxMove : 0;
    if (fakeThumb) {
      fakeThumb.style.height = thumbHeight + 'px';
      fakeThumb.style.transform = 'translateY(' + thumbPos + 'px)';
    }
  }

  contactsInner.addEventListener('scroll', updateThumb);
  window.addEventListener('resize', updateThumb);
  updateThumb();

  // ---------------- SCROLL con rueda sobre sidebar
  const sidebarEl = document.getElementById('sidebar');
  sidebarEl.addEventListener(
    'wheel',
    e => {
      const rect = sidebarEl.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        menu.scrollTop += e.deltaY;
        e.preventDefault();
      }
    },
    { passive: false }
  );

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[
        m
      ])
    );
  }
});
