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

  const sections = {
    home: '<div class="presentation fade-in"><h1>Hi, I’m Raúl De Jesús Larios</h1><p>Turning ideas into apps and games is what I do best.<br>I enjoy building interactive experiences that are both fun and functional.<br>Always curious, always coding, always debugging.</p><p>Take a look at my work and see what I’ve been creating.</p></div>',
    about: '<div class="section fade-in"><h2>About</h2><p>I’m a passionate developer who loves creating applications and games that are engaging, functional, and fun. I enjoy turning ideas into interactive experiences and tackling every challenge along the way—bugs included.</p></div>'
  };

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

  setContent(sections.home);

  const pdfUrl = 'cv.pdf';
  const imgUrl = 'cv.png';
  let overlay = document.getElementById('cvOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cvOverlay';
    overlay.className = 'cv-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.innerHTML = ''
      + '<div class="cv-modal" role="document">'
      +   '<div class="cv-toolbar">'
      +     '<div class="left"><button class="cv-button cv-close" aria-label="Cerrar CV">✕</button></div>'
      +     '<div class="right"><a class="cv-download" href="'+pdfUrl+'" download>Descargar CV</a></div>'
      +   '</div>'
      +   '<div class="cv-frame-wrapper"><img class="cv-image" src="'+imgUrl+'" alt="Currículum Vitae"></div>'
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
    else setContent(sections.home);
    if (cvMenuItem) cvMenuItem.classList.remove('active');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.key;
      if (overlay.classList.contains('open')) closeOverlay();
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (key === 'github') { window.open('https://github.com/rdjl-dev','_blank'); setContent(sections.home); items.forEach(i => i.classList.remove('active')); const homeBtn = menu.querySelector('[data-key="home"]'); if (homeBtn) homeBtn.classList.add('active'); clearProjectUrlIfNeeded(); closeSidebarMobile(); return; }
      if (key === 'contact') { openOverlay(); closeSidebarMobile(); return; }
      if (key === 'projects') { renderProjectSearch(); closeSidebarMobile(); return; }
      if (sections[key]) { setContent(sections[key]); clearProjectUrlIfNeeded(); closeSidebarMobile(); }
    });
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); } });
  });

  const suggestions = [
    { type: 'search', label: 'Search the web (fictitious)' },
    { type: 'link', label: 'My GitHub', url: 'https://github.com/rdjl-dev' },
    { type: 'link', label: 'My LinkedIn', url: 'https://www.linkedin.com/in/ra%C3%BAl-de-jes%C3%BAs-larios/' }
  ];
  function renderSuggestions(q = '') {
    suggestionsEl.innerHTML = '';
    suggestions.forEach(s => {
      const div = document.createElement('div'); div.className = 'suggestion'; div.setAttribute('role','option');
      div.innerHTML = '<span>' + s.label + '</span><span>' + (s.type === 'link' ? '↗' : '🔎') + '</span>';
      div.addEventListener('click', () => {
        suggestionsEl.hidden = true;
        if (s.type === 'link') window.open(s.url,'_blank');
        else setContent('<div class="section fade-in"><h2>Search results</h2><p>Results for \"'+escapeHtml(q)+'\" (fictitious)</p></div>');
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
    if (text === 'home' || text === 'inicio') { const btn = menu.querySelector('[data-key="home"]'); if (btn) btn.click(); return; }
    if (text === 'about' || text === 'acerca' || text === 'about me') { const btn = menu.querySelector('[data-key="about"]'); if (btn) btn.click(); return; }
    if (text === 'projects' || text === 'project' || text === 'proyectos') { const btn = menu.querySelector('[data-key="projects"]'); if (btn) btn.click(); return; }
    if (text === 'github') { const btn = menu.querySelector('[data-key="github"]'); if (btn) btn.click(); return; }
    if (text === 'contact' || text === 'cv' || text === 'contacto') { const btn = menu.querySelector('[data-key="contact"]'); if (btn) btn.click(); return; }
    setContent('<div class="section fade-in"><h2>Search results</h2><p>Results for \"'+escapeHtml(q)+'\" (fictitious)</p></div>');
    clearProjectUrlIfNeeded();
  }
  searchBtn.addEventListener('click', () => { handleSearchQuery(searchInput.value); suggestionsEl.hidden = true; });
  searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearchQuery(searchInput.value); suggestionsEl.hidden = true; } });

  const projectItems = [
    { id: 'p1', title: 'Super Jump — Mini Game (Unity prototype)', url: 'https://example.com/super-jump', desc: 'Prototipo de mecánica de plataformas con físicas mejoradas y power-ups.', youtube: 'M7lc1UVf-VE' },
    { id: 'p2', title: 'PhotoShare App (Flutter)', url: 'https://example.com/photoshare', desc: 'Aplicación móvil para compartir fotos, con pipeline de subida optimizada.', youtube: 'dQw4w9WgXcQ' },
    { id: 'p3', title: 'Portfolio Website (Vanilla JS)', url: 'https://example.com/portfolio', desc: 'Mi portafolio personal con animaciones y búsqueda ficticia integradas.', youtube: 'M7lc1UVf-VE' }
  ];

  function renderProjectSearch(){
    let html = '<div class="result-list fade-in" role="region" aria-label="Resultados de proyectos">';
    html += '<div style="margin-bottom:12px;font-weight:800">Proyectos — resultados</div>';
    projectItems.forEach(p => {
      html += '<div class="result-item" data-id="'+p.id+'"><button type="button" class="result-title" data-id="'+p.id+'" aria-label="'+escapeHtml(p.title)+'">'+escapeHtml(p.title)+'</button><button type="button" class="result-url" data-id="'+p.id+'" aria-label="Abrir '+escapeHtml(p.url)+'">'+escapeHtml(p.url)+'</button><div class="result-desc">'+escapeHtml(p.desc)+'</div></div>';
    });
    html += '</div>';
    setContent(html);
    clearProjectUrlIfNeeded();
  }

  viewer.addEventListener('click', (e) => {
    const titleBtn = e.target.closest('.result-title');
    if (titleBtn) {
      const id = titleBtn.dataset.id;
      const project = projectItems.find(p => p.id === id);
      if (project) openProjectPreview(project);
      return;
    }
    const urlBtn = e.target.closest('.result-url');
    if (urlBtn) {
      const id = urlBtn.dataset.id;
      const project = projectItems.find(p => p.id === id);
      if (project) openProjectPreview(project);
      return;
    }
    const row = e.target.closest('.result-item');
    if (row && !e.target.closest('button')) {
      const id = row.dataset.id;
      const project = projectItems.find(p => p.id === id);
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
    if (focusEl.classList.contains('result-title') || focusEl.classList.contains('result-url')) {
      focusEl.click();
    }
    if (focusEl.id === 'backToResults') renderProjectSearch();
  });

  function openProjectPreview(project){
    searchInput.value = project.url;
    currentProjectUrl = project.url;
    const html = '<div class="section fade-in"><div style="display:flex;gap:18px;flex-direction:column;"><div style="display:flex;align-items:center;justify-content:space-between;"><h2 style="margin:0;">'+escapeHtml(project.title)+'</h2><button id="backToResults" class="cv-button" aria-label="Volver a resultados">← Volver</button></div><div style="margin-top:12px;"><div style="position:relative;padding-top:56.25%;border-radius:8px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);"><iframe src="https://www.youtube.com/embed/'+encodeURIComponent(project.youtube)+'" title="'+escapeHtml(project.title)+'" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p style="margin-top:12px;color:rgba(0,0,0,0.72)">'+escapeHtml(project.desc)+'</p><p style="font-size:13px;color:rgba(0,0,0,0.55)">URL (ficticia): <span style="color:var(--accent);font-weight:800">'+escapeHtml(project.url)+'</span></p></div></div></div>';
    setContent(html);
    setTimeout(() => { const back = document.getElementById('backToResults'); if (back) back.focus(); }, 80);
  }

  function clearProjectUrlIfNeeded(){
    if (!currentProjectUrl) return;
    if (searchInput && searchInput.value === currentProjectUrl) searchInput.value = '';
    currentProjectUrl = null;
  }

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

  const sidebarEl = document.getElementById('sidebar');
  sidebarEl.addEventListener('wheel', e => {
    const rect = sidebarEl.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      menu.scrollTop += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  function escapeHtml(str){ return String(str).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }

  function openContactsMobile(){ contacts.classList.add('open-mobile'); if (contactsToggle) contactsToggle.setAttribute('aria-expanded','true'); if (contactsCloseBtn) contactsCloseBtn.hidden = false; document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }
  function closeContactsMobile(){ contacts.classList.remove('open-mobile'); if (contactsToggle) contactsToggle.setAttribute('aria-expanded','false'); if (contactsCloseBtn) contactsCloseBtn.hidden = true; document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }
  if (contactsToggle) contactsToggle.addEventListener('click', () => contacts.classList.contains('open-mobile') ? closeContactsMobile() : openContactsMobile());
  if (contactsCloseBtn) contactsCloseBtn.addEventListener('click', closeContactsMobile);

  function openSidebarMobile(){ sidebar.classList.add('open-mobile'); if (menuToggle) menuToggle.setAttribute('aria-expanded','true'); if (sidebarCloseBtn) sidebarCloseBtn.hidden = false; document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }
  function closeSidebarMobile(){ sidebar.classList.remove('open-mobile'); if (menuToggle) menuToggle.setAttribute('aria-expanded','false'); if (sidebarCloseBtn) sidebarCloseBtn.hidden = true; document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }
  if (menuToggle) menuToggle.addEventListener('click', () => sidebar.classList.contains('open-mobile') ? closeSidebarMobile() : openSidebarMobile());
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebarMobile);

  document.addEventListener('click', (e) => {
    if (window.matchMedia('(max-width:720px)').matches) {
      if (!contacts.contains(e.target) && !contactsToggle.contains(e.target)) closeContactsMobile();
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) closeSidebarMobile();
    }
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeContactsMobile(); closeSidebarMobile(); } });
});
