
// script.js
// يولّد بطاقات القائمة ويُفعّل سلايدر صور لكل بطاقة (دعم أزرار + سحب باللمس)
// يتعامل مع RTL: يجعل الحركة بصريًا من اليمين إلى الشمال لو كانت الصفحة RTL

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // 🛒 CART LOGIC
  // ============================

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.title} تمت إضافته إلى السلة ✅`);
  }

  // ============================

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
  ];

  const menuGrid = document.getElementById('menu-grid');
  if (!menuGrid) return;

  const CACHE_BUST = false;
  const DEFAULT_TRANSITION = 'transform 300ms ease';

  function createProductCard(product) {

    const frame = document.createElement('div');
    frame.className = 'card-frame';

    const card = document.createElement('article');
    card.className = 'card';
    frame.appendChild(card);

    const slider = document.createElement('div');
    slider.className = 'photo-slider';
    slider.setAttribute('data-index', '0');

    const slides = document.createElement('div');
    slides.className = 'slides';
    slides.style.transition = DEFAULT_TRANSITION;

    product.images.forEach((src, i) => {
      const img = document.createElement('img');
      img.className = 'slide';
      img.src = CACHE_BUST ? `${src}?v=${Date.now()}` : src;
      img.alt = `${product.title} - صورة ${i + 1}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = () => {
        if (!img._triedPlaceholder) {
          img._triedPlaceholder = true;
          img.src = 'images/placeholder.jpg';
        }
      };
      slides.appendChild(img);
    });

    slider.appendChild(slides);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'slide-btn prev';
    prevBtn.type = 'button';
    prevBtn.innerText = '‹';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'slide-btn next';
    nextBtn.type = 'button';
    nextBtn.innerText = '›';

    if (product.images.length > 1) {
      slider.appendChild(prevBtn);
      slider.appendChild(nextBtn);
    }

    const dots = document.createElement('div');
    dots.className = 'slide-dots';

    if (product.images.length > 1) {
      product.images.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.type = 'button';
        dot.dataset.idx = idx;
        if (idx === 0) dot.classList.add('active');
        dots.appendChild(dot);
      });
      slider.appendChild(dots);
    }

    card.appendChild(slider);

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

    // ✅ التعديل هنا
    addBtn.addEventListener('click', () => {
      addToCart(product);
    });

    actions.appendChild(addBtn);

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(price);
    body.appendChild(actions);

    card.appendChild(body);

    return frame;
  }

  products.forEach(p => {
    menuGrid.appendChild(createProductCard(p));
  });

});
