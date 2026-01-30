// script.js
// يولّد بطاقات القائمة ويُفعّل سلايدر صور لكل بطاقة (دعم أزرار + سحب باللمس)
// يتعامل مع RTL: يجعل الحركة بصريًا من اليمين إلى الشمال لو كانت الصفحة RTL

document.addEventListener('DOMContentLoaded', () => {
  // بيانات توضيحية — عدّل/أضف الصور كما تحب
  const products = [
    {
      id: 'dolma',
      title: 'محشي العثماني',
      desc: 'طعم أصيل ومحشي بمكونات ممتازة.',
      price: '120 ج.م',
      images: [
        'images/dolma-1.jpg',
        'images/dolma-2.jpg'
      ]
    },
    {
      id: 'pistachio',
      title: 'بستاشيو فاخر',
      desc: 'قوام كريمي ومكسرات مختارة.',
      price: '95 ج.م',
      images: [
        'images/pistachio-1.jpg',
        'images/pistachio-2.jpg'
      ]
    }
    // أضف منتجات أخرى هنا بنفس الشكل
  ];

  const menuGrid = document.getElementById('menu-grid');
  if (!menuGrid) return; // منع الأخطاء لو العنصر غير موجود

  // إعدادات:
  const CACHE_BUST = false; // ضع true أثناء التطوير لو تُحدّث الصور بنفس الاسم
  const DEFAULT_TRANSITION = 'transform 300ms ease';

  function createProductCard(product) {
    const frame = document.createElement('div');
    frame.className = 'card-frame';

    const card = document.createElement('article');
    card.className = 'card';
    frame.appendChild(card);

    // slider container
    const slider = document.createElement('div');
    slider.className = 'photo-slider';
    slider.setAttribute('data-index', '0');

    const slides = document.createElement('div');
    slides.className = 'slides';
    slides.style.transition = DEFAULT_TRANSITION; // تأكد من وجود transition افتراضي

    product.images.forEach((src, i) => {
      const img = document.createElement('img');
      img.className = 'slide';
      // cache-busting اختياري أثناء التطوير
      img.src = CACHE_BUST ? `${src}?v=${Date.now()}` : src;
      img.alt = `${product.title} - صورة ${i + 1}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      // عند فشل التحميل، ضع صورة بديلة (ضع placeholder.jpg في مجلد images)
      img.onerror = () => {
        if (!img._triedPlaceholder) {
          img._triedPlaceholder = true;
          img.src = 'images/placeholder.jpg';
        } else {
          img.style.background = 'linear-gradient(45deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01))';
        }
      };
      slides.appendChild(img);
    });

    slider.appendChild(slides);

    // prev/next buttons (مخفية إذا صورة واحدة)
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slide-btn prev';
    prevBtn.type = 'button';
    prevBtn.title = 'السابق';
    prevBtn.innerText = '‹';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'slide-btn next';
    nextBtn.type = 'button';
    nextBtn.title = 'التالي';
    nextBtn.innerText = '›';

    if (product.images.length > 1) {
      slider.appendChild(prevBtn);
      slider.appendChild(nextBtn);
    }

    // dots
    const dots = document.createElement('div');
    dots.className = 'slide-dots';
    if (product.images.length > 1) {
      product.images.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.type = 'button';
        dot.setAttribute('data-idx', String(idx));
        dot.setAttribute('aria-label', `عرض ${idx + 1}`);
        if (idx === 0) dot.classList.add('active');
        dots.appendChild(dot);
      });
      slider.appendChild(dots);
    }

    card.appendChild(slider);

    // card body
    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.innerText = product.title;

    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.innerText = product.desc;

    const price = document.createElement('div');
    price.className = 'card-price';
    price.innerText = product.price;

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.type = 'button';
    addBtn.innerText = 'أضف إلى السلة';
    addBtn.addEventListener('click', () => {
      // هنا تضع المنطق لإضافة المنتج للسلة
      alert(`${product.title} أُضيفت إلى السلة (مثال).`);
    });

    actions.appendChild(addBtn);

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(price);
    body.appendChild(actions);

    card.appendChild(body);

    // ===== Slider logic per-card =====
    if (product.images.length > 1) {
      let index = 0;
      const total = product.images.length;

      // اكتشاف اتجاه الصفحة (RTL أم LTR)
      const isRTL = getComputedStyle(document.body).direction === 'rtl';

      // initial state
      prevBtn.disabled = true;
      nextBtn.disabled = (total <= 1);

      // update function يعكس الإزاحة بصرياً في حالة RTL
      const update = (newIndex) => {
        index = Math.max(0, Math.min(total - 1, newIndex));
        // في LTR: -index*100%, في RTL: +index*100% => الحركة تبدو من اليمين للشمال
        const offset = isRTL ? index * 100 : -index * 100;
        slides.style.transform = `translateX(${offset}%)`;
        slider.setAttribute('data-index', String(index));
        // update dots
        const allDots = slider.querySelectorAll('.dot');
        allDots.forEach(d => d.classList.remove('active'));
        if (allDots[index]) allDots[index].classList.add('active');

        // disable buttons at ends
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === total - 1);
      };

      prevBtn.addEventListener('click', () => update(index - 1));
      nextBtn.addEventListener('click', () => update(index + 1));

      // dots click (delegation)
      dots.addEventListener('click', (e) => {
        const btn = e.target;
        if (btn && btn.classList.contains('dot')) {
          const idx = Number(btn.getAttribute('data-idx'));
          update(idx);
        }
      });

      // touch swipe
      let startX = 0;
      let deltaX = 0;
      slides.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        slides.style.transition = 'none';
      }, {passive:true});

      slides.addEventListener('touchmove', (e) => {
        deltaX = e.touches[0].clientX - startX;
        // percent موجب لو السحب لليمين، سالب لو لليسار
        const percent = deltaX / slider.clientWidth * 100;
        const base = isRTL ? index * 100 : -index * 100;
        // أثناء السحب نعرض تحريك نسبي (في RTL الإشارة تظهر معكوسة بصرياً)
        slides.style.transform = `translateX(calc(${base}% + ${percent}%))`;
      }, {passive:true});

      slides.addEventListener('touchend', () => {
        // رجّع transition المحدد
        slides.style.transition = DEFAULT_TRANSITION;
        if (Math.abs(deltaX) > 40) {
          // المعنى: في LTR سحب لليسار (deltaX < 0) => next
          // في RTL نعكس المعنى لأن التمرير البصري معكوس
          if (deltaX < 0) update(index + (isRTL ? -1 : 1));
          else update(index + (isRTL ? 1 : -1));
        } else {
          update(index); // snap back
        }
        startX = 0;
        deltaX = 0;
      });
    }

    return frame;
  }

  // render all products
  products.forEach(p => {
    const card = createProductCard(p);
    menuGrid.appendChild(card);
  });

  // CTA scroll to menu
  const scrollBtn = document.getElementById('scroll-to-menu');
  const menuEl = document.getElementById('menu');

  if (scrollBtn && menuEl) {
    scrollBtn.addEventListener('click', () => {
      const isRTL = getComputedStyle(document.body).direction === 'rtl';
      menuEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: isRTL ? 'end' : 'start'
      });
    });
  }

  // year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
