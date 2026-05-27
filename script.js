// ─── i18n ───────────────────────────────────────────────
const i18n = {
  en: {
    contacts_title: 'CONTACTS',
    label_phone: 'Phone',
    label_location: 'Location',
    label_languages: 'Languages',
    label_availability: 'Availability',
    value_availability: 'Open to work',
    search_label: 'SEARCH',
    search_placeholder: 'Search the portfolio (fictitious)',
    search_btn: 'Search',
    nav_home: 'Home',
    nav_about: 'About',
    nav_projects: 'Projects',
    section_home_h1: "Hi, I'm Raúl De Jesús Larios",
    section_home_subtitle: 'Junior Unity Developer · Junior Backend Developer',
    section_home_p1: 'Turning ideas into apps and games is what I do best. I enjoy building interactive experiences that are both fun and functional.',
    section_home_p2: 'Always curious, always coding, always debugging. Take a look at my work and see what I\'ve been creating.',
    section_about_h2: 'About',
    section_about_p: 'Hello, I\'m <b>Raúl De Jesús Larios</b> — a <b>developer</b> with a strong interest in creating both <b>interactive applications</b> and <b>video games</b>. I enjoy designing experiences that are <b>engaging</b>, <b>functional</b>, and <b>polished</b>, whether it involves building mechanics in <b>Unity</b>, developing mobile apps in <b>Android Studio</b>, or prototyping new ideas. My approach combines <b>technical problem-solving</b>, <b>structured design</b>, and <b>continuous iteration</b>. Each project — from small prototypes to long-term developments — represents both a <b>creative challenge</b> and an opportunity to grow.',
    projects_heading: 'Projects — results',
    search_results_h2: 'Search results',
    search_results_p: 'Results for "{q}" (fictitious)',
    back_btn: '← Back',
    cv_download: 'Download CV',
    cv_close: 'Close CV',
    suggestion_web: 'Search the web (fictitious)',
    suggestion_github: 'My GitHub',
    suggestion_linkedin: 'My LinkedIn',
    proj_vermillion_title: 'Vermillion — Video Game',
    proj_vermillion_desc: 'Video game developed over 4 months during the Video Game Specialization course. Built with Unity.',
    proj_pirate_title: 'Pirate Adventure — Mobile (Kids)',
    proj_pirate_desc: 'Mobile and Windows game for children developed as part of the company internship during the Video Game Specialization course. Built with Unity.',
    proj_dam_title: 'DAM Final Project — Android Game',
    proj_dam_desc: 'Final project for DAM. Android game built with LibGDX using Android Studio.',
  },
  es: {
    contacts_title: 'CONTACTO',
    label_phone: 'Teléfono',
    label_location: 'Ubicación',
    label_languages: 'Idiomas',
    label_availability: 'Disponibilidad',
    value_availability: 'Disponible para trabajar',
    search_label: 'BUSCAR',
    search_placeholder: 'Busca en el portfolio (ficticio)',
    search_btn: 'Buscar',
    nav_home: 'Inicio',
    nav_about: 'Sobre mí',
    nav_projects: 'Proyectos',
    section_home_h1: 'Hola, soy Raúl De Jesús Larios',
    section_home_subtitle: 'Desarrollador Junior Unity · Desarrollador Junior Backend',
    section_home_p1: 'Convertir ideas en apps y videojuegos es lo que mejor se me da. Disfruto construyendo experiencias interactivas que sean divertidas y funcionales.',
    section_home_p2: 'Siempre curioso, siempre programando, siempre depurando. Echa un vistazo a mi trabajo y ve lo que he estado creando.',
    section_about_h2: 'Sobre mí',
    section_about_p: 'Hola, soy <b>Raúl De Jesús Larios</b> — un <b>desarrollador</b> con gran interés en crear <b>aplicaciones interactivas</b> y <b>videojuegos</b>. Me gusta diseñar experiencias <b>atractivas</b>, <b>funcionales</b> y <b>pulidas</b>, ya sea programando mecánicas en <b>Unity</b>, desarrollando apps móviles en <b>Android Studio</b> o prototipando nuevas ideas. Mi enfoque combina la <b>resolución de problemas</b>, el <b>diseño estructurado</b> y la <b>iteración continua</b>. Cada proyecto representa tanto un <b>reto creativo</b> como una oportunidad de crecer.',
    projects_heading: 'Proyectos — resultados',
    search_results_h2: 'Resultados de búsqueda',
    search_results_p: 'Resultados para "{q}" (ficticio)',
    back_btn: '← Volver',
    cv_download: 'Descargar CV',
    cv_close: 'Cerrar CV',
    suggestion_web: 'Buscar en la web (ficticio)',
    suggestion_github: 'Mi GitHub',
    suggestion_linkedin: 'Mi LinkedIn',
    proj_vermillion_title: 'Vermillion — Videojuego',
    proj_vermillion_desc: 'Videojuego desarrollado en 4 meses durante el Curso de Especialización en Desarrollo de Videojuegos. Construido con Unity.',
    proj_pirate_title: 'Pirate Adventure — Móvil (Niños)',
    proj_pirate_desc: 'Juego móvil y de Windows para niños, desarrollado durante las prácticas del Curso de Especialización en Videojuegos. Construido con Unity.',
    proj_dam_title: 'Proyecto Final DAM — Juego Android',
    proj_dam_desc: 'Proyecto final del ciclo DAM. Juego Android desarrollado con LibGDX en Android Studio.',
  }
};

let currentLang = 'en';
let currentView = 'home'; // track current view to re-render on lang change

function t(key){ return (i18n[currentLang] || i18n.en)[key] || key; }

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

// ─── DOM Ready ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.getElementById('viewer');
  const menu = document.querySelector('.sidebar .menu');
  const items = Array.from(menu.querySelectorAll('.menu-item'));
  const contacts = document.getElementById('contacts');
  const contactsInner = document.querySelector('.contacts-inner');
  const fakeThumb = document.querySelector('.fake-scroll .thumb');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const suggestionsEl = document.getElementById('suggestions');
  const cvMenuItem = menu.querySelector('[data-key="contact"]');
  const contactsToggle = document.getElementById('contactsToggle');
  const contactsCloseBtn = document.getElementById('contactsCloseBtn');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  // ─── Language toggle ───
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      applyI18n();
      rerenderCurrentView();
    });
  });
  applyI18n();

  // ─── Content sections (generated dynamically using t()) ───
  function getSections(){
    return {
      home: `<div class="presentation fade-in">
        <h1>${escapeHtml(t('section_home_h1'))}</h1>
        <div class="subtitle">${escapeHtml(t('section_home_subtitle'))}</div>
        <p>${escapeHtml(t('section_home_p1'))}</p>
        <p>${escapeHtml(t('section_home_p2'))}</p>
      </div>`,
      about: `<div class="section fade-in">
        <h2>${escapeHtml(t('section_about_h2'))}</h2>
        <p>${t('section_about_p')}</p>
      </div>`
    };
  }

  function rerenderCurrentView(){
    const sections = getSections();
    if (currentView === 'home') setContent(sections.home);
    else if (currentView === 'about') setContent(sections.about);
    else if (currentView === 'projects') renderProjectSearch();
    // cv overlay and project preview: no rerender needed
  }

  let currentProjectUrl = null;

  function normalizeHtml(s){ return String(s).replace(/\s+/g,' ').trim(); }
  function getVisibleContentElement(){ return Array.from(viewer.children).find(c => c.dataset.origin === 'content' && c.style.display !== 'none'); }
  function setContent(html){
    const visible = getVisibleContentElement();
    const newNorm = normalizeHtml(html);
    if (visible){
      const visibleNorm = normalizeHtml(visible.innerHTML);
      if (visibleNorm === newNorm) return;
      visible.classList.remove('fade-in'); visible.classList.add('fade-out');
      setTimeout(() => {
        Array.from(viewer.children).forEach(c => { if (c.dataset.origin === 'content') c.remove(); });
        const wrapper = document.createElement('div'); wrapper.dataset.origin = 'content'; wrapper.innerHTML = html;
        viewer.insertBefore(wrapper, viewer.firstChild);
      }, 320);
    } else {
      Array.from(viewer.children).forEach(c => { if (c.dataset.origin === 'content') c.remove(); });
      const wrapper = document.createElement('div'); wrapper.dataset.origin = 'content'; wrapper.innerHTML = html;
      viewer.insertBefore(wrapper, viewer.firstChild);
    }
  }

  setContent(getSections().home);

  // ─── CV Overlay ───
  const pdfUrl = 'cv.pdf';
  const imgUrl = 'cv.png';
  let overlay = document.getElementById('cvOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cvOverlay';
    overlay.className = 'cv-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.innerHTML =
      '<div class="cv-modal" role="document">'
      + '<div class="cv-toolbar">'
      +   '<div class="left"><button class="cv-button cv-close" aria-label="Cerrar CV">✕</button></div>'
      +   '<div class="right"><a class="cv-download" href="'+pdfUrl+'" download>'+t('cv_download')+'</a></div>'
      + '</div>'
      + '<div class="cv-frame-wrapper"><img class="cv-image" src="'+imgUrl+'" alt="Currículum Vitae"></div>'
      + '</div>';
    document.body.appendChild(overlay);
  }
  const overlayClose = overlay.querySelector('.cv-close');

  function openOverlay(){
    Array.from(viewer.children).forEach(c => { if (c.dataset.origin === 'content') c.style.display = 'none'; });
    overlay.classList.add('open');
    items.forEach(i => i.classList.remove('active'));
    if (cvMenuItem) cvMenuItem.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    clearProjectUrlIfNeeded();
  }
  function closeOverlay(){
    overlay.classList.remove('open');
    const contentChildren = Array.from(viewer.children).filter(c => c.dataset.origin === 'content');
    if (contentChildren.length > 0) contentChildren.forEach(c => c.style.display = '');
    else setContent(getSections().home);
    if (cvMenuItem) cvMenuItem.classList.remove('active');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });

  // ─── Menu items ───
  items.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.key;
      if (overlay.classList.contains('open')) closeOverlay();
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (key === 'github') {
        window.open('https://github.com/rdjl-dev','_blank');
        currentView = 'home';
        setContent(getSections().home);
        items.forEach(i => i.classList.remove('active'));
        const homeBtn = menu.querySelector('[data-key="home"]');
        if (homeBtn) homeBtn.classList.add('active');
        clearProjectUrlIfNeeded(); closeSidebarMobile(); return;
      }
      if (key === 'contact') { openOverlay(); closeSidebarMobile(); return; }
      if (key === 'projects') { currentView = 'projects'; renderProjectSearch(); closeSidebarMobile(); return; }
      const sections = getSections();
      if (sections[key]) { currentView = key; setContent(sections[key]); clearProjectUrlIfNeeded(); closeSidebarMobile(); }
    });
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); } });
  });

  // ─── Search suggestions ───
  function getSuggestions(){
    return [
      { type: 'search', label: t('suggestion_web') },
      { type: 'link', label: t('suggestion_github'), url: 'https://github.com/rdjl-dev' },
      { type: 'link', label: t('suggestion_linkedin'), url: 'https://www.linkedin.com/in/ra%C3%BAl-de-jes%C3%BAs-larios/' }
    ];
  }
  function renderSuggestions(q = '') {
    suggestionsEl.innerHTML = '';
    getSuggestions().forEach(s => {
      const div = document.createElement('div'); div.className = 'suggestion'; div.setAttribute('role','option');
      div.innerHTML = '<span>' + s.label + '</span><span>' + (s.type === 'link' ? '↗' : '🔎') + '</span>';
      div.addEventListener('click', () => {
        suggestionsEl.hidden = true;
        if (s.type === 'link') window.open(s.url,'_blank');
        else { currentView = 'search'; setContent('<div class="section fade-in"><h2>'+escapeHtml(t('search_results_h2'))+'</h2><p>'+escapeHtml(t('search_results_p').replace('{q}',q))+'</p></div>'); }
      });
      suggestionsEl.appendChild(div);
    });
    suggestionsEl.hidden = false;
  }
  searchInput.addEventListener('focus', () => renderSuggestions(searchInput.value.trim()));
  searchInput.addEventListener('input', () => renderSuggestions(searchInput.value.trim()));
  document.addEventListener('click', e => { if (!e.composedPath().includes(suggestionsEl) && !e.composedPath().includes(searchInput)) suggestionsEl.hidden = true; });

  function handleSearchQuery(q){
    const text = String(q || '').trim().toLowerCase();
    if (!text) return;
    if (['home','inicio','inicio'].includes(text)) { const btn = menu.querySelector('[data-key="home"]'); if (btn) btn.click(); return; }
    if (['about','acerca','about me','sobre mí','sobre mi'].includes(text)) { const btn = menu.querySelector('[data-key="about"]'); if (btn) btn.click(); return; }
    if (['projects','project','proyectos','proyecto'].includes(text)) { const btn = menu.querySelector('[data-key="projects"]'); if (btn) btn.click(); return; }
    if (text === 'github') { const btn = menu.querySelector('[data-key="github"]'); if (btn) btn.click(); return; }
    if (['contact','cv','contacto'].includes(text)) { const btn = menu.querySelector('[data-key="contact"]'); if (btn) btn.click(); return; }
    currentView = 'search';
    setContent('<div class="section fade-in"><h2>'+escapeHtml(t('search_results_h2'))+'</h2><p>'+escapeHtml(t('search_results_p').replace('{q}',q))+'</p></div>');
    clearProjectUrlIfNeeded();
  }
  searchBtn.addEventListener('click', () => { handleSearchQuery(searchInput.value); suggestionsEl.hidden = true; });
  searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearchQuery(searchInput.value); suggestionsEl.hidden = true; } });

  // ─── Projects ───
  function getProjectItems(){
    return [
      { id: 'vermillion', title: t('proj_vermillion_title'), desc: t('proj_vermillion_desc'), driveId: '1GQxggXMPnpqyn72ISw6T97XRAlzQ-ONx' },
      { id: 'pirate-adventure', title: t('proj_pirate_title'), desc: t('proj_pirate_desc'), driveId: '1vlysJOJsT7knRT72JhtEZQb-Qx5Dh8Nl' },
      { id: 'dam-final', title: t('proj_dam_title'), desc: t('proj_dam_desc'), driveId: '1WKNbT_eJgipuckpck0j77OfSrcFWr-kg' }
    ];
  }

  function renderProjectSearch(){
    const projects = getProjectItems();
    let html = '<div class="result-list fade-in" role="region" aria-label="Project results">';
    html += '<div style="margin-bottom:14px;font-family:var(--font-display);font-weight:900;font-size:18px;letter-spacing:1px;text-transform:uppercase;color:var(--accent);border-bottom:3px solid var(--accent);padding-bottom:8px;">' + escapeHtml(t('projects_heading')) + '</div>';
    projects.forEach(p => {
      html += '<div class="result-item" data-id="'+p.id+'">'
           + '<button type="button" class="result-title" data-id="'+p.id+'" aria-label="'+escapeHtml(p.title)+'">'+escapeHtml(p.title)+'</button>'
           + '<div class="result-desc">'+escapeHtml(p.desc)+'</div>'
           + '</div>';
    });
    html += '</div>';
    setContent(html);
    clearProjectUrlIfNeeded();
  }

  viewer.addEventListener('click', (e) => {
    const titleBtn = e.target.closest('.result-title');
    if (titleBtn) {
      const id = titleBtn.dataset.id;
      const project = getProjectItems().find(p => p.id === id);
      if (project) openProjectPreview(project);
      return;
    }
    const row = e.target.closest('.result-item');
    if (row && !e.target.closest('button')) {
      const id = row.dataset.id;
      const project = getProjectItems().find(p => p.id === id);
      if (project) openProjectPreview(project);
      return;
    }
    if (e.target.id === 'backToResults' || e.target.closest('#backToResults')) {
      renderProjectSearch();
      return;
    }
  });

  viewer.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const focusEl = document.activeElement;
    if (!viewer.contains(focusEl)) return;
    if (focusEl.classList.contains('result-title')) focusEl.click();
    if (focusEl.id === 'backToResults') renderProjectSearch();
  });

  function openProjectPreview(project){
    searchInput.value = '';
    currentProjectUrl = null;
    let iframeSrc = '';
    const iframeAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    if (project.youtube) {
      iframeSrc = 'https://www.youtube.com/embed/' + encodeURIComponent(project.youtube);
    } else if (project.driveId) {
      iframeSrc = 'https://drive.google.com/file/d/' + encodeURIComponent(project.driveId) + '/preview';
    } else if (project.url) {
      iframeSrc = project.url;
    }
    const iframeHtml = '<div class="project-video" role="region" aria-label="'+escapeHtml(project.title)+' video preview">'
      + '<iframe src="'+escapeHtml(iframeSrc)+'" title="'+escapeHtml(project.title)+'" allow="'+escapeHtml(iframeAllow)+'" allowfullscreen loading="lazy"></iframe>'
      + '</div>';
    const html = '<div class="section fade-in"><div style="display:flex;gap:18px;flex-direction:column;">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;">'
      + '<h2 style="margin:0;">'+escapeHtml(project.title)+'</h2>'
      + '<button id="backToResults" class="search-btn" aria-label="Back to results" style="font-size:13px;">'+escapeHtml(t('back_btn'))+'</button>'
      + '</div>'
      + '<div style="margin-top:12px;">'
      + iframeHtml
      + '<p style="margin-top:14px;color:rgba(0,0,0,0.72)">'+escapeHtml(project.desc)+'</p>'
      + '</div></div></div>';
    setContent(html);
    setTimeout(() => { const back = document.getElementById('backToResults'); if (back) back.focus(); }, 80);
  }

  function clearProjectUrlIfNeeded(){
    if (!currentProjectUrl) return;
    if (searchInput && searchInput.value === currentProjectUrl) searchInput.value = '';
    currentProjectUrl = null;
  }

  // ─── Fake scroll thumb ───
  function updateThumb(){
    const el = contactsInner;
    const trackHeight = el.clientHeight;
    const scrollHeight = el.scrollHeight;
    const visibleRatio = Math.max(0.05, Math.min(1, trackHeight / scrollHeight));
    const thumbHeight = Math.max(40, trackHeight * visibleRatio);
    const maxScroll = scrollHeight - trackHeight;
    const scrollTop = el.scrollTop;
    const thumbMaxMove = trackHeight - thumbHeight;
    const thumbPos = maxScroll > 0 ? (scrollTop / maxScroll) * thumbMaxMove : 0;
    if (fakeThumb) { fakeThumb.style.height = thumbHeight + 'px'; fakeThumb.style.transform = 'translateY(' + thumbPos + 'px)'; }
  }
  contactsInner.addEventListener('scroll', updateThumb);
  window.addEventListener('resize', updateThumb);
  updateThumb();

  // ─── Sidebar scroll ───
  const sidebarEl = document.getElementById('sidebar');
  sidebarEl.addEventListener('wheel', e => {
    const rect = sidebarEl.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      menu.scrollTop += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  // ─── Escape html ───
  function escapeHtml(str){ return String(str).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }

  // ─── Mobile: contacts ───
  function openContactsMobile(){ contacts.classList.add('open-mobile'); if (contactsToggle) contactsToggle.setAttribute('aria-expanded','true'); if (contactsCloseBtn) contactsCloseBtn.hidden = false; document.documentElement.style.overflow='hidden'; document.body.style.overflow='hidden'; }
  function closeContactsMobile(){ contacts.classList.remove('open-mobile'); if (contactsToggle) contactsToggle.setAttribute('aria-expanded','false'); if (contactsCloseBtn) contactsCloseBtn.hidden = true; document.documentElement.style.overflow=''; document.body.style.overflow=''; }
  if (contactsToggle) contactsToggle.addEventListener('click', () => contacts.classList.contains('open-mobile') ? closeContactsMobile() : openContactsMobile());
  if (contactsCloseBtn) contactsCloseBtn.addEventListener('click', closeContactsMobile);

  // ─── Mobile: sidebar ───
  function openSidebarMobile(){ sidebar.classList.add('open-mobile'); if (menuToggle) menuToggle.setAttribute('aria-expanded','true'); if (sidebarCloseBtn) sidebarCloseBtn.hidden = false; document.documentElement.style.overflow='hidden'; document.body.style.overflow='hidden'; }
  function closeSidebarMobile(){ sidebar.classList.remove('open-mobile'); if (menuToggle) menuToggle.setAttribute('aria-expanded','false'); if (sidebarCloseBtn) sidebarCloseBtn.hidden = true; document.documentElement.style.overflow=''; document.body.style.overflow=''; }
  if (menuToggle) menuToggle.addEventListener('click', () => sidebar.classList.contains('open-mobile') ? closeSidebarMobile() : openSidebarMobile());
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebarMobile);

  document.addEventListener('click', (e) => {
    if (window.matchMedia('(max-width:720px)').matches) {
      if (!contacts.contains(e.target) && contactsToggle && !contactsToggle.contains(e.target)) closeContactsMobile();
      if (!sidebar.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) closeSidebarMobile();
    }
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeContactsMobile(); closeSidebarMobile(); } });

  // ─── Contacts collapsed (dropdown) for medium screens ───
  let contactsDropdown = null;
  function setContactsCollapsedMode(active){
    if (active){
      contacts.style.display = 'none';
      if (!contactsDropdown){
        contactsDropdown = document.createElement('div');
        contactsDropdown.id = 'contactsDropdown';
        contactsDropdown.className = 'contacts-dropdown';
        const inner = contacts.querySelector('.contacts-inner');
        contactsDropdown.innerHTML = '<div class="contacts-dropdown-body" tabindex="0">'+(inner ? inner.innerHTML : '')+'</div><button id="contactsDropdownClose" class="contacts-close-btn" aria-label="Cerrar">✕</button>';
        const header = document.querySelector('.window-header');
        header.appendChild(contactsDropdown);
        const closeBtn = contactsDropdown.querySelector('#contactsDropdownClose');
        closeBtn.addEventListener('click', () => { contactsDropdown.classList.remove('open'); if (contactsToggle) contactsToggle.setAttribute('aria-expanded','false'); });
        contactsDropdown.addEventListener('click', (e) => { if (e.target === contactsDropdown) { contactsDropdown.classList.remove('open'); if (contactsToggle) contactsToggle.setAttribute('aria-expanded','false'); } });
      }
    } else {
      contacts.style.display = '';
      if (contactsDropdown){ contactsDropdown.remove(); contactsDropdown = null; if (contactsToggle) contactsToggle.setAttribute('aria-expanded','false'); }
    }
  }
  function toggleContactsDropdown(){
    if (!contactsDropdown) return;
    contactsDropdown.classList.toggle('open');
    const expanded = contactsDropdown.classList.contains('open');
    if (contactsToggle) contactsToggle.setAttribute('aria-expanded', String(expanded));
  }
  if (contactsToggle){
    contactsToggle.addEventListener('click', (e) => {
      const collapsed = window.innerWidth < 1400;
      if (!collapsed){ if (contacts) contacts.scrollIntoView({behavior:'smooth',block:'center'}); return; }
      toggleContactsDropdown();
    });
  }
  function handleContactsCollapseOnResize(){ setContactsCollapsedMode(window.innerWidth < 1400); }
  window.addEventListener('resize', handleContactsCollapseOnResize);
  handleContactsCollapseOnResize();

  // set home active by default
  const homeBtn = menu.querySelector('[data-key="home"]');
  if (homeBtn) homeBtn.classList.add('active');
});
