// script.js
// يولّد بطاقات القائمة ويُفعّل سلايدر صور لكل بطاقة (دعم أزرار + سحب باللمس)
// يتعامل مع RTL: يجعل الحركة بصريًا من اليمين إلى الشمال لو كانت الصفحة RTL
// ويعرض إشعارات toast بدل alert ويحتفظ بسلة بسيطة في الذاكرة

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

  // ======= Simple cart (in-memory) =======
  const cart = [];

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1
      });
    }
    updateCartUI();
  }

  function updateCartUI() {
    const cartList = document.querySelector('.cart-list');
    if (!cartList) return; // إذا ماعندك قائمة في الـ HTML تجاهل
    cartList.innerHTML = cart.map(item => {
      return `<li class="cart-item" data-id="${item.id}">
        <strong>${item.title}</strong> <span class="cart-qty">x${item.qty}</span>
        <div class="cart-price">${item.price}</div>
      </li>`;
    }).join('');
  }

  // toast (non-blocking notification)
  function showToast(text, timeout = 2000) {
    let toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.textContent = text;
    document.body.appendChild(toast);
    // force reflow then show
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      // إزالة بعد انتهاء الإخفاء
      setTimeout(() => toast.remove(), 300);
    }, timeout);
  }

  // ======= createProductCard =======
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
    // <-- هنا بدل alert نستخدم addToCart + showToast
    addBtn.addEventListener('click', () => {
      addToCart(product);
      showToast(`${product.title} أُضيفت إلى السلة`);
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
// script.js
// سلايدر صور + سلة طلبات كاملة (إضافة / حذف / إجمالي)
// RTL friendly + Toast notifications
// Compatible with GitHub Pages

document.addEventListener('DOMContentLoaded', () => {

  /* ================== PRODUCTS ================== */
  const products = [
    {
      id: 'dolma',
      title: 'محشي العثماني',
      desc: 'طعم أصيل ومحشي بمكونات ممتازة.',
      price: '120 ج.م',
      images: ['images/dolma-1.jpg', 'images/dolma-2.jpg']
    },
    {
      id: 'pistachio',
      title: 'بستاشيو فاخر',
      desc: 'قوام كريمي ومكسرات مختارة.',
      price: '95 ج.م',
      images: ['images/pistachio-1.jpg', 'images/pistachio-2.jpg']
    }
  ];

  const menuGrid = document.getElementById('menu-grid');
  const cartList = document.getElementById('cart-items');
  const emptyCartPanel = document.querySelector('.cart-panel');
  const totalPriceEl = document.getElementById('total-price');

  /* ================== CART ================== */
  const cart = [];

  const parsePrice = (str) =>
    Number(str.replace(/[^\d]/g, '')) || 0;

  function addToCart(product) {
    const found = cart.find(i => i.id === product.id);
    if (found) {
      found.qty += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: parsePrice(product.price),
        qty: 1
      });
    }
    updateCartUI();
  }

  function removeFromCart(id) {
    const index = cart.findIndex(i => i.id === id);
    if (index !== -1) cart.splice(index, 1);
    updateCartUI();
  }

  function updateCartUI() {
    cartList.innerHTML = '';

    if (cart.length === 0) {
      emptyCartPanel.style.display = 'flex';
      totalPriceEl.textContent = '0 ج.م';
      return;
    }

    emptyCartPanel.style.display = 'none';

    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <span>
          <strong>${item.title}</strong>
          <small> × ${item.qty}</small>
        </span>
        <div class="cart-actions">
          <span>${itemTotal} ج.م</span>
          <button class="remove-btn" title="حذف">✕</button>
        </div>
      `;

      li.querySelector('.remove-btn')
        .addEventListener('click', () => removeFromCart(item.id));

      cartList.appendChild(li);
    });

    totalPriceEl.textContent = `${total} ج.م`;
  }

  /* ================== TOAST ================== */
  function showToast(text, timeout = 2000) {
    const toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.textContent = text;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, timeout);
  }

  /* ================== PRODUCT CARD ================== */
  function createProductCard(product) {
    const frame = document.createElement('div');
    frame.className = 'card-frame';

    const card = document.createElement('article');
    card.className = 'card';
    frame.appendChild(card);

    /* ---------- Slider ---------- */
    const slider = document.createElement('div');
    slider.className = 'photo-slider';

    const slides = document.createElement('div');
    slides.className = 'slides';

    product.images.forEach(src => {
      const img = document.createElement('img');
      img.className = 'slide';
      img.src = src;
      img.alt = product.title;
      img.loading = 'lazy';
      slides.appendChild(img);
    });

    slider.appendChild(slides);

    if (product.images.length > 1) {
      let index = 0;
      const total = product.images.length;
      const isRTL = getComputedStyle(document.body).direction === 'rtl';

      const prev = document.createElement('button');
      const next = document.createElement('button');

      prev.className = 'slide-btn prev';
      next.className = 'slide-btn next';
      prev.textContent = '‹';
      next.textContent = '›';

      slider.append(prev, next);

      const update = (i) => {
        index = Math.max(0, Math.min(total - 1, i));
        const offset = isRTL ? index * 100 : -index * 100;
        slides.style.transform = `translateX(${offset}%)`;
        prev.disabled = index === 0;
        next.disabled = index === total - 1;
      };

      prev.onclick = () => update(index - 1);
      next.onclick = () => update(index + 1);

      update(0);
    }

    card.appendChild(slider);

    /* ---------- Card Body ---------- */
    const body = document.createElement('div');
    body.className = 'card-body';

    body.innerHTML = `
      <h3 class="card-title">${product.title}</h3>
      <p class="card-desc">${product.desc}</p>
      <div class="card-price">${product.price}</div>
    `;

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.textContent = 'أضف إلى السلة';

    addBtn.addEventListener('click', () => {
      addToCart(product);
      showToast(`${product.title} أُضيفت إلى السلة`);
    });

    actions.appendChild(addBtn);
    body.appendChild(actions);
    card.appendChild(body);

    return frame;
  }

  /* ================== RENDER ================== */
  products.forEach(p => {
    menuGrid.appendChild(createProductCard(p));
  });

  /* ================== SCROLL CTA ================== */
  const scrollBtn = document.getElementById('scroll-to-menu');
  const menuEl = document.getElementById('menu');

  if (scrollBtn && menuEl) {
    scrollBtn.addEventListener('click', () => {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ================== FOOTER YEAR ================== */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

});
