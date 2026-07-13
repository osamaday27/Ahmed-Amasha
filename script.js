const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.answer');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.answer').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    formNote.textContent = 'شكرًا لتواصلك! سأرد عليك في أقرب وقت ممكن.';
    form.reset();
  });
}

const projects = {"create-portfolio-blog-website": {"title": "Create Portfolio Blog Website", "category": "موقع شخصي ومدونة", "description": "منصة احترافية لعرض الهوية الشخصية والأعمال والمقالات والخبرات في تجربة واحدة منظمة."}, "snefro-factory-ecommerce": {"title": "Snefro Factory Ecommerce", "category": "متجر إلكتروني · مصنع", "description": "متجر إلكتروني متكامل لعرض منتجات المصنع وإدارة تجربة التسوق والطلبات بشكل واضح وقابل للتوسع."}, "factory-his": {"title": "Factory HIS", "category": "نظام إدارة", "description": "نظام إداري مخصص لتنظيم العمليات والبيانات وسير العمل داخل المؤسسة من خلال واجهات عملية ولوحات متابعة."}, "hospital-system": {"title": "Hospital System", "category": "نظام مستشفى", "description": "نظام متكامل لإدارة عمليات المستشفى والبيانات والخدمات الطبية والإدارية ضمن تجربة موحدة."}, "appnabra-education-platform": {"title": "Appnabra Education Platform", "category": "منصة تعليمية", "description": "منصة تعليمية رقمية لتنظيم المحتوى والدورات وتجربة المتعلم وإدارة العملية التعليمية."}, "neo-gym-system": {"title": "Neo Gym System", "category": "نظام إدارة جيم", "description": "نظام لإدارة الاشتراكات والعملاء والحضور والخدمات والعمليات اليومية داخل صالات الألعاب الرياضية."}, "neo-pos-system": {"title": "Neo POS System", "category": "نظام نقاط بيع", "description": "نظام نقاط بيع وإدارة مبيعات يساعد على تنظيم المنتجات والفواتير والحركة اليومية والتقارير."}, "nile-noir-hotel": {"title": "Nile Noir Hotel", "category": "فندق · ضيافة", "description": "تجربة رقمية لفندق تجمع بين العرض البصري للخدمات والغرف وتسهيل وصول العميل إلى المعلومات والحجز."}, "pro-pre-idea-crm": {"title": "Pro-Pre Idea CRM", "category": "CRM", "description": "نظام لإدارة علاقات العملاء ومتابعة البيانات والفرص والمهام وسير العمل التجاري في مكان واحد."}, "snefro-clothing-store": {"title": "Snefro Clothing Store", "category": "متجر ملابس", "description": "متجر ملابس بواجهة حديثة لعرض المنتجات والتصنيفات وتقديم تجربة تسوق سهلة على مختلف الأجهزة."}, "tawqit-education-redesign": {"title": "Tawqit Education Redesign", "category": "إعادة تصميم تعليمي", "description": "إعادة تصميم تجربة منصة تعليمية بهدف تحسين الوضوح والتنقل وعرض المحتوى وتجربة المستخدم."}, "theqa": {"title": "Theqa", "category": "منصة خدمات", "description": "منصة رقمية تربط المستخدم بالخدمات من خلال تجربة منظمة وواجهات تساعد على الوصول للخدمة المطلوبة بسهولة."}, "theqa-services-website": {"title": "Theqa Services Website", "category": "موقع خدمات", "description": "موقع تعريفي وتسويقي لعرض الخدمات والقيمة المقدمة وتحويل الزوار إلى عملاء من خلال رحلة واضحة."}, "viver-website": {"title": "Viver Website", "category": "موقع ويب", "description": "موقع حديث بهوية بصرية مرنة وتجربة متجاوبة لعرض المحتوى والخدمات بشكل احترافي."}, "social": {"title": "Social", "category": "منصة اجتماعية", "description": "تجربة منصة اجتماعية تركز على عرض المحتوى والتفاعل وبناء واجهة سهلة الاستخدام وقابلة للتطوير."}};

const projectModal = document.getElementById('projectModal');
const projectModalContent = document.getElementById('projectModalContent');

function openProject(slug) {
  const project = projects[slug];
  if (!project || !projectModal || !projectModalContent) return;
  const shots = Array.from({ length: 8 }, (_, index) => `
    <div class="project-shot">
      <div class="project-shot-fallback"><i class="bi bi-image"></i></div>
      <img src="assets/projects/${slug}/${index + 1}.PNG" alt="${project.title} - صورة ${index + 1}" loading="lazy" onerror="this.style.display='none'">
    </div>
  `).join('');
  projectModalContent.innerHTML = `
    <div class="project-modal-head">
      <span>${project.category}</span>
      <h2>${project.title}</h2>
      <p>${project.description} تم تنفيذ المشروع وفق متطلباته الخاصة وباستخدام التقنيات المناسبة لطبيعة المنتج، مع التركيز على سهولة الاستخدام والتنظيم وقابلية التطوير.</p>
    </div>
    <div class="project-gallery">${shots}</div>
  `;
  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProject() {
  if (!projectModal) return;
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeProject));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProject();
});
