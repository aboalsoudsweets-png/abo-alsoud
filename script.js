// script.js
// يولّد بطاقات القائمة ويُفعّل سلايدر صور لك�� بطاقة (دعم أزرار + سحب باللمس)

document.addEventListener('DOMContentLoaded', () => {
  // بيانات توضيحية — عدّل/أضف الصور كما تحب
  const products = [
    {
      id: 'dolma',
      title: 'دولما ابو السعود',
      desc: 'طعم أصيل ومحشي بمكونات ممتازة.',
      price: '500 ج.م',
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

    product.images.forEach((src, i) => {
      const img = document.createElement('img');
      img.className = 'slide';
      img.src = src;
      img.alt = `${product.title} - صورة ${i + 1}`;
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
      const update = (newIndex) => {
        index = Math.max(0, Math.min(total - 1, newIndex));
        slides.style.transform = `translateX(-${index * 100}%)`;
        slider.setAttribute('data-index', String(index));
        // update dots
        const allDots = slider.querySelectorAll('.dot');
        allDots.forEach(d => d.classList.remove('active'));
        if (allDots[index]) allDots[index].classList.add('active');

        // disable buttons at ends (optional)
        if (prevBtn) prevBtn.disabled = (index === 0);
        if (nextBtn) nextBtn.disabled = (index === total - 1);
      };

      prevBtn.addEventListener('click', () => update(index - 1));
      nextBtn.addEventListener('click', () => update(index + 1));

      // dots click
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
        const percent = deltaX / slider.clientWidth * 100;
        slides.style.transform = `translateX(calc(-${index * 100}% + ${percent}%))`;
      }, {passive:true});

      slides.addEventListener('touchend', () => {
        slides.style.transition = '';
        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0) update(index + 1);
          else update(index - 1);
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
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      document.getElementById('menu').scrollIntoView({behavior: 'smooth'});
    });
  }

  // year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
