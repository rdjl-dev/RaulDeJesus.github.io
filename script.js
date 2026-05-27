// ─── Favicon fallback (prevents 404 if favicon.ico missing) ─
(function(){
  if (!document.querySelector('link[rel~="icon"]')){
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>";
    document.head.appendChild(link);
  }
})();

// ─── Search config ───────────────────────────────────────
// Uses DuckDuckGo (no API key required, works on GitHub Pages)

// ─── i18n ────────────────────────────────────────────────
const i18n = {
  en: {
    contacts_title: 'CONTACTS',
    label_phone: 'Phone',
    label_location: 'Location',
    label_languages: 'Languages',
    label_availability: 'Availability',
    value_availability: 'Open to work',
    search_label: 'SEARCH',
    search_placeholder: 'Search anything…',
    search_btn: 'Search',
    nav_home: 'Home',
    nav_about: 'About',
    nav_projects: 'Projects',
    section_home_h1: "Hi, I'm Raúl De Jesús Larios",
    section_home_subtitle: 'Junior Unity Developer · Junior Backend Developer',
    section_home_p1: 'Turning ideas into apps and games is what I do best. I enjoy building interactive experiences that are both fun and functional.',
    section_home_p2: "Always curious, always coding, always debugging. Take a look at my work and see what I've been creating.",
    section_about_h2: 'About',
    section_about_p: 'Hello, I\'m <b>Raúl De Jesús Larios</b> — a <b>developer</b> with a strong interest in creating both <b>interactive applications</b> and <b>video games</b>. I enjoy designing experiences that are <b>engaging</b>, <b>functional</b>, and <b>polished</b>, whether it involves building mechanics in <b>Unity</b>, developing mobile apps in <b>Android Studio</b>, or prototyping new ideas. My approach combines <b>technical problem-solving</b>, <b>structured design</b>, and <b>continuous iteration</b>. Each project represents both a <b>creative challenge</b> and an opportunity to grow.',
    projects_heading: 'Projects',
    search_results_h2: 'Results for',
    search_no_results: 'No results found for',
    search_error: 'Search error. Check your connection and try again.',
    search_loading: 'Searching…',
    search_page: 'Page',
    search_prev: '← Prev',
    search_next: 'Next →',
    back_btn: '← Back',
    cv_download: 'Download CV',
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
    search_placeholder: 'Busca lo que quieras…',
    search_btn: 'Buscar',
    nav_home: 'Inicio',
    nav_about: 'Sobre mí',
    nav_projects: 'Proyectos',
    section_home_h1: 'Hola, soy Raúl De Jesús Larios',
    section_home_subtitle: 'Desarrollador Junior Unity · Desarrollador Junior Backend',
    section_home_p1: 'Convertir ideas en apps y videojuegos es lo que mejor se me da. Disfruto construyendo experiencias interactivas que sean divertidas y funcionales.',
    section_home_p2: 'Siempre curioso, siempre programando, siempre depurando. Echa un vistazo a mi trabajo.',
    section_about_h2: 'Sobre mí',
    section_about_p: 'Hola, soy <b>Raúl De Jesús Larios</b> — un <b>desarrollador</b> con gran interés en crear <b>aplicaciones interactivas</b> y <b>videojuegos</b>. Me gusta diseñar experiencias <b>atractivas</b>, <b>funcionales</b> y <b>pulidas</b>, ya sea programando mecánicas en <b>Unity</b>, desarrollando apps móviles en <b>Android Studio</b> o prototipando nuevas ideas. Mi enfoque combina la <b>resolución de problemas</b>, el <b>diseño estructurado</b> y la <b>iteración continua</b>.',
    projects_heading: 'Proyectos',
    search_results_h2: 'Resultados para',
    search_no_results: 'Sin resultados para',
    search_error: 'Error en la búsqueda. Comprueba tu conexión.',
    search_loading: 'Buscando…',
    search_page: 'Página',
    search_prev: '← Ant',
    search_next: 'Sig →',
    back_btn: '← Volver',
    cv_download: 'Descargar CV',
    suggestion_github: 'Mi GitHub',
    suggestion_linkedin: 'Mi LinkedIn',
    proj_vermillion_title: 'Vermillion — Videojuego',
    proj_vermillion_desc: 'Videojuego desarrollado en 4 meses durante el Curso de Especialización en Videojuegos. Construido con Unity.',
    proj_pirate_title: 'Pirate Adventure — Móvil (Niños)',
    proj_pirate_desc: 'Juego móvil y Windows para niños, desarrollado durante las prácticas del curso de especialización. Construido con Unity.',
    proj_dam_title: 'Proyecto Final DAM — Juego Android',
    proj_dam_desc: 'Proyecto final del ciclo DAM. Juego Android desarrollado con LibGDX en Android Studio.',
  }
};

let currentLang = 'en';
let currentView  = 'home';

function t(key){ return (i18n[currentLang] || i18n.en)[key] || key; }

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

// ─── External Search ──────────────────────────────────────
// Opens DuckDuckGo in a new tab (no API key required)
function openExternalSearch(query){
  const url = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
  window.open(url, '_blank', 'noopener');
}

function renderSearchResults(data, query, startIndex){
  const items  = data.items || [];
  const info   = data.searchInformation || {};
  const total  = parseInt(info.totalResults || 0, 10);
  const count  = items.length;
  const page   = Math.ceil(startIndex / 10);
  const maxPage = Math.ceil(Math.min(total, 100) / 10); // Google caps at 100

  if (!count){
    return `<div class="result-list fade-in">
      <div class="results-header">${escapeHtml(t('search_no_results'))} "<b>${escapeHtml(query)}</b>"</div>
    </div>`;
  }

  let html = `<div class="result-list fade-in">
    <div class="results-header">
      ${escapeHtml(t('search_results_h2'))} "<b>${escapeHtml(query)}</b>"
      <span class="results-meta">${escapeHtml(info.formattedTotalResults || '')} results · ${escapeHtml(info.formattedSearchTime || '')}s</span>
    </div>`;

  items.forEach(item => {
    const title   = escapeHtml(item.title || '');
    const link    = escapeHtml(item.link  || '#');
    const display = escapeHtml(item.displayLink || item.link || '');
    const snippet = escapeHtml(item.snippet || '');
    const thumb   = item.pagemap?.cse_thumbnail?.[0]?.src || item.pagemap?.cse_image?.[0]?.src || '';

    html += `<div class="result-item">
      ${thumb ? `<img class="result-thumb" src="${escapeHtml(thumb)}" alt="" loading="lazy">` : ''}
      <div class="result-body">
        <a class="result-title" href="${link}" target="_blank" rel="noopener">${title}</a>
        <span class="result-url">${display}</span>
        <p class="result-desc">${snippet}</p>
      </div>
    </div>`;
  });

  // pagination
  html += `<div class="results-pagination">`;
  if (startIndex > 1){
    html += `<button class="search-btn results-page-btn" data-query="${escapeHtml(query)}" data-start="${startIndex - 10}">${escapeHtml(t('search_prev'))}</button>`;
  }
  html += `<span class="results-page-label">${escapeHtml(t('search_page'))} ${page}${maxPage > 1 ? ' / ' + maxPage : ''}</span>`;
  if (startIndex + 10 <= Math.min(total, 91)){
    html += `<button class="search-btn results-page-btn" data-query="${escapeHtml(query)}" data-start="${startIndex + 10}">${escapeHtml(t('search_next'))}</button>`;
  }
  html += `</div></div>`;

  return html;
}

// ─── DOM Ready ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const viewer          = document.getElementById('viewer');
  const menu            = document.querySelector('.sidebar .menu');
  const items           = Array.from(menu.querySelectorAll('.menu-item'));
  const contacts        = document.getElementById('contacts');
  const contactsInner   = document.querySelector('.contacts-inner');
  const fakeThumb       = document.querySelector('.fake-scroll .thumb');
  const searchInput     = document.getElementById('searchInput');
  const searchBtn       = document.getElementById('searchBtn');
  const suggestionsEl   = document.getElementById('suggestions');
  const cvMenuItem      = menu.querySelector('[data-key="contact"]');
  const contactsToggle  = document.getElementById('contactsToggle');
  const contactsCloseBtn= document.getElementById('contactsCloseBtn');
  const menuToggle      = document.getElementById('menuToggle');
  const sidebar         = document.getElementById('sidebar');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  // ── Language toggle ──
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

  // ── Sections ──
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
    if (currentView === 'home')     setContent(sections.home);
    else if (currentView === 'about')    setContent(sections.about);
    else if (currentView === 'projects') renderProjectSearch();
  }

  let currentProjectUrl = null;

  function normalizeHtml(s){ return String(s).replace(/\s+/g,' ').trim(); }
  function getVisibleContentElement(){ return Array.from(viewer.children).find(c => c.dataset.origin === 'content' && c.style.display !== 'none'); }

  function setContent(html){
    const visible = getVisibleContentElement();
    const newNorm = normalizeHtml(html);
    if (visible){
      if (normalizeHtml(visible.innerHTML) === newNorm) return;
      visible.classList.remove('fade-in');
      visible.classList.add('fade-out');
      setTimeout(() => {
        Array.from(viewer.children).forEach(c => { if (c.dataset.origin==='content') c.remove(); });
        const w = document.createElement('div'); w.dataset.origin='content'; w.innerHTML=html;
        viewer.insertBefore(w, viewer.firstChild);
      }, 320);
    } else {
      Array.from(viewer.children).forEach(c => { if (c.dataset.origin==='content') c.remove(); });
      const w = document.createElement('div'); w.dataset.origin='content'; w.innerHTML=html;
      viewer.insertBefore(w, viewer.firstChild);
    }
  }

  setContent(getSections().home);

  // ── CV Overlay ──
  const pdfUrl = 'cv.pdf';
  const imgUrl = 'cv.png';
  let overlay = document.getElementById('cvOverlay');
  if (!overlay){
    overlay = document.createElement('div');
    overlay.id = 'cvOverlay'; overlay.className = 'cv-overlay';
    overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true');
    overlay.innerHTML =
      '<div class="cv-modal" role="document">'
      +'<div class="cv-toolbar">'
      +'<div class="left"><button class="cv-button cv-close" aria-label="Cerrar CV">✕</button></div>'
      +'<div class="right"><a class="cv-download" href="'+pdfUrl+'" download>'+t('cv_download')+'</a></div>'
      +'</div>'
      +'<div class="cv-frame-wrapper"><img class="cv-image" src="'+imgUrl+'" alt="CV"></div>'
      +'</div>';
    document.body.appendChild(overlay);
  }
  const overlayClose = overlay.querySelector('.cv-close');

  function openOverlay(){
    Array.from(viewer.children).forEach(c => { if (c.dataset.origin==='content') c.style.display='none'; });
    overlay.classList.add('open');
    items.forEach(i => i.classList.remove('active'));
    if (cvMenuItem) cvMenuItem.classList.add('active');
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';
    clearProjectUrlIfNeeded();
  }
  function closeOverlay(){
    overlay.classList.remove('open');
    const cc = Array.from(viewer.children).filter(c => c.dataset.origin==='content');
    if (cc.length) cc.forEach(c => c.style.display='');
    else setContent(getSections().home);
    if (cvMenuItem) cvMenuItem.classList.remove('active');
    document.documentElement.style.overflow='';
    document.body.style.overflow='';
  }
  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => { if (e.target===overlay) closeOverlay(); });
  window.addEventListener('keydown', e => { if (e.key==='Escape' && overlay.classList.contains('open')) closeOverlay(); });

  // ── Menu ──
  items.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.key;
      if (overlay.classList.contains('open')) closeOverlay();
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (key==='github'){
        window.open('https://github.com/rdjl-dev','_blank');
        currentView='home'; setContent(getSections().home);
        items.forEach(i=>i.classList.remove('active'));
        const h=menu.querySelector('[data-key="home"]'); if(h) h.classList.add('active');
        clearProjectUrlIfNeeded(); closeSidebarMobile(); return;
      }
      if (key==='contact'){ openOverlay(); closeSidebarMobile(); return; }
      if (key==='projects'){ currentView='projects'; renderProjectSearch(); closeSidebarMobile(); return; }
      const sections=getSections();
      if (sections[key]){ currentView=key; setContent(sections[key]); clearProjectUrlIfNeeded(); closeSidebarMobile(); }
    });
    item.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){ e.preventDefault(); item.click(); } });
  });

  // ── Search ──
  async function handleSearchQuery(query){
    const q = String(query||'').trim();
    if (!q) return;

    // internal shortcuts
    const ql = q.toLowerCase();
    if (['home','inicio'].includes(ql))           { menu.querySelector('[data-key="home"]')?.click(); return; }
    if (['about','sobre mí','sobre mi','acerca'].includes(ql)) { menu.querySelector('[data-key="about"]')?.click(); return; }
    if (['projects','proyectos'].includes(ql))    { menu.querySelector('[data-key="projects"]')?.click(); return; }
    if (ql==='github')                             { menu.querySelector('[data-key="github"]')?.click(); return; }
    if (['cv','contact','contacto'].includes(ql)) { menu.querySelector('[data-key="contact"]')?.click(); return; }

    // external search via DuckDuckGo
    suggestionsEl.hidden = true;
    openExternalSearch(q);
    clearProjectUrlIfNeeded();
  }

  // pagination clicks delegated on viewer
  viewer.addEventListener('click', async e => {
    // pagination (no longer used with external search — kept as no-op for safety)

    // project list click
    const titleBtn = e.target.closest('.result-title[data-id]');
    if (titleBtn){ const p=getProjectItems().find(x=>x.id===titleBtn.dataset.id); if(p) openProjectPreview(p); return; }
    const row = e.target.closest('.result-item[data-id]');
    if (row && !e.target.closest('button')){ const p=getProjectItems().find(x=>x.id===row.dataset.id); if(p) openProjectPreview(p); return; }
    if (e.target.id==='backToResults'||e.target.closest('#backToResults')){ renderProjectSearch(); return; }
  });

  // suggestions (quick links only, no fake search)
  function renderSuggestions(){
    const quickLinks = [
      { label: t('suggestion_github'),  url: 'https://github.com/rdjl-dev' },
      { label: t('suggestion_linkedin'), url: 'https://www.linkedin.com/in/ra%C3%BAl-de-jes%C3%BAs-larios/' }
    ];
    suggestionsEl.innerHTML = '';
    quickLinks.forEach(s => {
      const div = document.createElement('div');
      div.className='suggestion'; div.setAttribute('role','option');
      div.innerHTML = '<span>'+escapeHtml(s.label)+'</span><span>↗</span>';
      div.addEventListener('click', () => { suggestionsEl.hidden=true; window.open(s.url,'_blank'); });
      suggestionsEl.appendChild(div);
    });
    suggestionsEl.hidden = false;
  }
  searchInput.addEventListener('focus', renderSuggestions);
  document.addEventListener('click', e => {
    if (!e.composedPath().includes(suggestionsEl) && !e.composedPath().includes(searchInput)) suggestionsEl.hidden=true;
  });

  searchBtn.addEventListener('click', () => handleSearchQuery(searchInput.value));
  searchInput.addEventListener('keydown', e => { if (e.key==='Enter'){ e.preventDefault(); handleSearchQuery(searchInput.value); } });

  // ── Projects ──
  function getProjectItems(){
    return [
      { id:'vermillion',     title:t('proj_vermillion_title'), desc:t('proj_vermillion_desc'), driveId:'1GQxggXMPnpqyn72ISw6T97XRAlzQ-ONx' },
      { id:'pirate-adventure',title:t('proj_pirate_title'),    desc:t('proj_pirate_desc'),    driveId:'1vlysJOJsT7knRT72JhtEZQb-Qx5Dh8Nl' },
      { id:'dam-final',      title:t('proj_dam_title'),        desc:t('proj_dam_desc'),        driveId:'1WKNbT_eJgipuckpck0j77OfSrcFWr-kg' }
    ];
  }

  function renderProjectSearch(){
    const projects = getProjectItems();
    let html = `<div class="result-list fade-in" role="region">
      <div class="results-header">${escapeHtml(t('projects_heading'))}</div>`;
    projects.forEach(p => {
      html += `<div class="result-item" data-id="${p.id}">
        <div class="result-body">
          <button type="button" class="result-title" data-id="${p.id}">${escapeHtml(p.title)}</button>
          <p class="result-desc">${escapeHtml(p.desc)}</p>
        </div>
      </div>`;
    });
    html += '</div>';
    setContent(html); clearProjectUrlIfNeeded();
  }

  viewer.addEventListener('keydown', e => {
    if (e.key!=='Enter') return;
    const el = document.activeElement;
    if (!viewer.contains(el)) return;
    if (el.classList.contains('result-title')) el.click();
    if (el.id==='backToResults') renderProjectSearch();
  });

  function openProjectPreview(project){
    searchInput.value=''; currentProjectUrl=null;
    let iframeSrc='';
    const allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    if (project.youtube)       iframeSrc='https://www.youtube.com/embed/'+encodeURIComponent(project.youtube);
    else if (project.driveId)  iframeSrc='https://drive.google.com/file/d/'+encodeURIComponent(project.driveId)+'/preview';
    else if (project.url)      iframeSrc=project.url;

    const html = `<div class="section fade-in"><div style="display:flex;gap:18px;flex-direction:column;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <h2 style="margin:0;">${escapeHtml(project.title)}</h2>
        <button id="backToResults" class="search-btn" style="font-size:13px;">${escapeHtml(t('back_btn'))}</button>
      </div>
      <div class="project-video" role="region">
        <iframe src="${escapeHtml(iframeSrc)}" title="${escapeHtml(project.title)}" allow="${escapeHtml(allow)}" allowfullscreen loading="lazy"></iframe>
      </div>
      <p style="color:rgba(0,0,0,0.72)">${escapeHtml(project.desc)}</p>
    </div></div>`;
    setContent(html);
    setTimeout(() => { document.getElementById('backToResults')?.focus(); }, 80);
  }

  function clearProjectUrlIfNeeded(){
    if (!currentProjectUrl) return;
    if (searchInput?.value===currentProjectUrl) searchInput.value='';
    currentProjectUrl=null;
  }

  // ── Fake scroll ──
  function updateThumb(){
    const el=contactsInner, th=el.clientHeight, sh=el.scrollHeight;
    const ratio=Math.max(0.05,Math.min(1,th/sh));
    const thumbH=Math.max(40,th*ratio);
    const maxS=sh-th, pos=maxS>0?(el.scrollTop/maxS)*(th-thumbH):0;
    if (fakeThumb){ fakeThumb.style.height=thumbH+'px'; fakeThumb.style.transform='translateY('+pos+'px)'; }
  }
  contactsInner.addEventListener('scroll',updateThumb);
  window.addEventListener('resize',updateThumb);
  updateThumb();

  // ── Sidebar scroll wheel ──
  sidebar.addEventListener('wheel', e => {
    const r=sidebar.getBoundingClientRect();
    if (e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){ menu.scrollTop+=e.deltaY; e.preventDefault(); }
  },{ passive:false });

  // ── Mobile contacts ──
  function openContactsMobile(){ contacts.classList.add('open-mobile'); contactsToggle?.setAttribute('aria-expanded','true'); if(contactsCloseBtn) contactsCloseBtn.hidden=false; document.documentElement.style.overflow='hidden'; document.body.style.overflow='hidden'; }
  function closeContactsMobile(){ contacts.classList.remove('open-mobile'); contactsToggle?.setAttribute('aria-expanded','false'); if(contactsCloseBtn) contactsCloseBtn.hidden=true; document.documentElement.style.overflow=''; document.body.style.overflow=''; }
  contactsToggle?.addEventListener('click', () => contacts.classList.contains('open-mobile') ? closeContactsMobile() : openContactsMobile());
  contactsCloseBtn?.addEventListener('click', closeContactsMobile);

  // ── Mobile sidebar ──
  function openSidebarMobile(){ sidebar.classList.add('open-mobile'); menuToggle?.setAttribute('aria-expanded','true'); if(sidebarCloseBtn) sidebarCloseBtn.hidden=false; document.documentElement.style.overflow='hidden'; document.body.style.overflow='hidden'; }
  function closeSidebarMobile(){ sidebar.classList.remove('open-mobile'); menuToggle?.setAttribute('aria-expanded','false'); if(sidebarCloseBtn) sidebarCloseBtn.hidden=true; document.documentElement.style.overflow=''; document.body.style.overflow=''; }
  menuToggle?.addEventListener('click', () => sidebar.classList.contains('open-mobile') ? closeSidebarMobile() : openSidebarMobile());
  sidebarCloseBtn?.addEventListener('click', closeSidebarMobile);

  document.addEventListener('click', e => {
    if (!window.matchMedia('(max-width:720px)').matches) return;
    if (!contacts.contains(e.target) && !contactsToggle?.contains(e.target)) closeContactsMobile();
    if (!sidebar.contains(e.target)  && !menuToggle?.contains(e.target))     closeSidebarMobile();
  });
  window.addEventListener('keydown', e => { if (e.key==='Escape'){ closeContactsMobile(); closeSidebarMobile(); } });

  // ── Contacts collapse (medium screens) ──
  let contactsDropdown = null;
  function setContactsCollapsedMode(active){
    if (active){
      contacts.style.display='none';
      if (!contactsDropdown){
        contactsDropdown=document.createElement('div');
        contactsDropdown.id='contactsDropdown'; contactsDropdown.className='contacts-dropdown';
        const inner=contacts.querySelector('.contacts-inner');
        contactsDropdown.innerHTML='<div class="contacts-dropdown-body" tabindex="0">'+(inner?inner.innerHTML:'')+'</div>'
          +'<button id="contactsDropdownClose" class="contacts-close-btn" aria-label="Cerrar">✕</button>';
        document.querySelector('.window-header').appendChild(contactsDropdown);
        contactsDropdown.querySelector('#contactsDropdownClose').addEventListener('click',()=>{ contactsDropdown.classList.remove('open'); contactsToggle?.setAttribute('aria-expanded','false'); });
      }
    } else {
      contacts.style.display='';
      if (contactsDropdown){ contactsDropdown.remove(); contactsDropdown=null; contactsToggle?.setAttribute('aria-expanded','false'); }
    }
  }
  function toggleContactsDropdown(){ if (!contactsDropdown) return; contactsDropdown.classList.toggle('open'); contactsToggle?.setAttribute('aria-expanded', String(contactsDropdown.classList.contains('open'))); }
  contactsToggle?.addEventListener('click', () => { if (window.innerWidth<1400) toggleContactsDropdown(); else contacts.scrollIntoView({behavior:'smooth',block:'center'}); });
  function handleResize(){ setContactsCollapsedMode(window.innerWidth<1400); }
  window.addEventListener('resize', handleResize);
  handleResize();

  // default active
  menu.querySelector('[data-key="home"]')?.classList.add('active');
});

function escapeHtml(str){ return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
