/* script.js
   - Dynamic menu rendering with multi-image slider support
   - Cart handling (in-memory)
   - Build WhatsApp message and open chat with store
   - Editable menuItems array below
*/

/* ---------------------------
   Editable menu array
   تعديل الأصناف هنا - يمكن إضافة/تعديل/حذف
   
   ملاحظة: الآن كل منتج يدعم صور متعددة (images)
   بدلاً من صورة واحدة (img)
----------------------------*/
const menuItems = [
   
   {
    id: '1',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/1.jpg', 'images/3.jpg'] // صورتين لكل منتج
  },
  {
    id: '2',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/5.jpg', 'images/5.jpg']
  },
  {
    id: '3',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/6.jpg', 'images/7.jpg']
  },
  {
    id: '4',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/8.jpg', 'images/10.jpg']
  },
  {
    id: '5',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/11.jpg', 'images/12.jpg']
  },
  {
    id: '6',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/13.jpg', 'images/14.jpg']
  },
  {
    id: '7',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/15.jpg', 'images/16.jpg']
  },
  {
    id: '8',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/17.jpg', 'images/18.jpg']
  },
  {
    id: '9',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/19.jpg', 'images/20.jpg']
  },
  {
    id: '10',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/21.jpg', 'images/22.jpg']
  },
  {
    id: '11',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    images: ['images/23.jpg', 'images/24.jpg']
  }
    
];

/* Cart structure: [{id, qty}] */
let cart = [];

/* DOM refs */
const menuGrid = document.getElementById('menu-grid');
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const placeOrderBtn = document.getElementById('place-order');
const nameEl = document.getElementById('customer-name');
const phoneEl = document.getElementById('customer-phone');
const addressEl = document.getElementById('customer-address');
const yearEl = document.getElementById('year');
const scrollToMenuBtn = document.getElementById('scroll-to-menu');

yearEl.textContent = new Date().getFullYear();

/* Utilities */
function formatPrice(n){ return `${n} ج.م`; }

/* ==========================================
   Image Slider Functions
   دوال التحكم في السلايدر
========================================== */
function createImageSlider(item) {
  const sliderDiv = document.createElement('div');
  sliderDiv.className = 'photo-slider';
  
  // إنشاء container الصور
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'slides';
  
  // إضافة الصور
  item.images.forEach((imgSrc, idx) => {
    const img = document.createElement('img');
    img.className = 'slide';
    img.src = imgSrc;
    img.alt = `${item.name} - صورة ${idx + 1}`;
    img.draggable = false;
    
    img.onerror = function() {
      this.style.background = '#f3e7de';
      this.alt = 'الصورة غير متاحة';
    };
    
    slidesContainer.appendChild(img);
  });
  
  sliderDiv.appendChild(slidesContainer);
  
  // إضافة أزرار التصفح (السابق والتالي)
  const prevBtn = document.createElement('button');
  prevBtn.className = 'slide-btn prev';
  prevBtn.innerHTML = '&#8249;'; // ←
  prevBtn.setAttribute('aria-label', 'الصورة السابقة');
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'slide-btn next';
  nextBtn.innerHTML = '&#8250;'; // →
  nextBtn.setAttribute('aria-label', 'الصورة التالية');
  
  sliderDiv.appendChild(prevBtn);
  sliderDiv.appendChild(nextBtn);
  
  // إضافة النقاط
  const dotsDiv = document.createElement('div');
  dotsDiv.className = 'slide-dots';
  
  item.images.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `الذهاب للصورة ${idx + 1}`);
    dotsDiv.appendChild(dot);
  });
  
  sliderDiv.appendChild(dotsDiv);
  
  // تفعيل وظائف السلايدر
  initSlider(sliderDiv, item.images.length);
  
  return sliderDiv;
}

function initSlider(sliderEl, totalImages) {
  let currentIndex = 0;
  const slidesContainer = sliderEl.querySelector('.slides');
  const prevBtn = sliderEl.querySelector('.slide-btn.prev');
  const nextBtn = sliderEl.querySelector('.slide-btn.next');
  const dots = sliderEl.querySelectorAll('.dot');
  
  // Touch support variables
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  
  function updateSlider() {
    // تحريك الصور
    slidesContainer.style.transform = `translateX(${currentIndex * 100}%)`;
    
    // تحديث النقاط
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
    
    // تحديث حالة الأزرار
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalImages - 1;
  }
  
  function goToSlide(index) {
    if (index >= 0 && index < totalImages) {
      currentIndex = index;
      updateSlider();
    }
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // الأزرار
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // النقاط
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx));
  });
  
  // Touch/Swipe Support
  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    slidesContainer.style.transition = 'none';
  }, { passive: true });
  
  slidesContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    touchEndX = e.touches[0].clientX;
  }, { passive: true });
  
  slidesContainer.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    
    const swipeDistance = touchStartX - touchEndX;
    const threshold = 50; // الحد الأدنى للمسافة للسحب
    
    slidesContainer.style.transition = '';
    
    if (swipeDistance > threshold) {
      // Swiped left (للأمام في RTL)
      nextSlide();
    } else if (swipeDistance < -threshold) {
      // Swiped right (للخلف في RTL)
      prevSlide();
    } else {
      // عدم السحب بما يكفي، العودة للموضع الحالي
      updateSlider();
    }
    
    touchStartX = 0;
    touchEndX = 0;
  });
  
  // Mouse drag support (اختياري)
  let mouseStartX = 0;
  let isMouseDragging = false;
  
  slidesContainer.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
    isMouseDragging = true;
    slidesContainer.style.cursor = 'grabbing';
    slidesContainer.style.transition = 'none';
    e.preventDefault();
  });
  
  slidesContainer.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return;
    e.preventDefault();
  });
  
  slidesContainer.addEventListener('mouseup', (e) => {
    if (!isMouseDragging) return;
    isMouseDragging = false;
    slidesContainer.style.cursor = 'grab';
    
    const swipeDistance = mouseStartX - e.clientX;
    const threshold = 50;
    
    slidesContainer.style.transition = '';
    
    if (swipeDistance > threshold) {
      nextSlide();
    } else if (swipeDistance < -threshold) {
      prevSlide();
    } else {
      updateSlider();
    }
  });
  
  slidesContainer.addEventListener('mouseleave', () => {
    if (isMouseDragging) {
      isMouseDragging = false;
      slidesContainer.style.cursor = 'grab';
      slidesContainer.style.transition = '';
      updateSlider();
    }
  });
  
  // Initial state
  slidesContainer.style.cursor = 'grab';
  updateSlider();
}

/* Render menu cards */
function renderMenu(){
  menuGrid.innerHTML = '';
  menuItems.forEach(item => {
    const frame = document.createElement('div');
    frame.className = 'card-frame';

    const card = document.createElement('article');
    card.className = 'card';

    // إضافة السلايدر بدلاً من صورة واحدة
    if (item.images && item.images.length > 0) {
      const slider = createImageSlider(item);
      card.appendChild(slider);
    } else {
      // Fallback: في حالة عدم وجود صور
      const placeholder = document.createElement('div');
      placeholder.style.height = '220px';
      placeholder.style.background = '#f3e7de';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.innerHTML = `<strong style="color:var(--maroon)">${item.name}</strong>`;
      card.appendChild(placeholder);
    }

    const body = document.createElement('div');
    body.className = 'card-body';

    const top = document.createElement('div');

    const title = document.createElement('h4');
    title.className = 'card-title';
    title.textContent = item.name;

    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = item.desc;

    top.appendChild(title);
    top.appendChild(desc);

    const bottom = document.createElement('div');

    const price = document.createElement('div');
    price.className = 'card-price';
    price.textContent = formatPrice(item.price);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = 'أضف للطلب +';
    addBtn.onclick = () => {
      addToCart(item.id);
      // scroll to order section for feedback on mobile
      document.getElementById('order').scrollIntoView({behavior:'smooth'});
    };

    actions.appendChild(addBtn);
    bottom.appendChild(price);
    bottom.appendChild(actions);

    body.appendChild(top);
    body.appendChild(bottom);

    card.appendChild(body);
    frame.appendChild(card);
    menuGrid.appendChild(frame);
  });
}

/* Cart functions */
function addToCart(id){
  const found = cart.find(i => i.id === id);
  if(found) found.qty++;
  else cart.push({id, qty:1});
  renderCart();
}

function changeQty(id, delta){
  const it = cart.find(i => i.id === id);
  if(!it) return;
  it.qty += delta;
  if(it.qty <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
}

function getTotal(){
  return cart.reduce((s, c) => {
    const item = menuItems.find(m => m.id === c.id);
    return s + (item ? item.price * c.qty : 0);
  }, 0);
}

/* Render cart list */
function renderCart(){
  cartItemsEl.innerHTML = '';
  if(cart.length === 0){
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'لا توجد أصناف مضافة بعد';
    cartItemsEl.appendChild(li);
    totalPriceEl.textContent = formatPrice(0);
    return;
  }

  cart.forEach(c => {
    const item = menuItems.find(m => m.id === c.id);
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '0.6rem 0';
    li.style.borderBottom = '1px dashed rgba(128,0,0,0.06)';

    const left = document.createElement('div');
    left.innerHTML = `<strong>${item.name}</strong><div style="color:#7b4747">${formatPrice(item.price)}</div>`;

    const ctrls = document.createElement('div');
    ctrls.style.display = 'flex';
    ctrls.style.alignItems = 'center';
    ctrls.style.gap = '0.45rem';

    const minus = document.createElement('button');
    minus.className = 'btn';
    minus.style.background = '#fff';
    minus.style.color = 'var(--maroon)';
    minus.style.border = '1px solid rgba(128,0,0,0.06)';
    minus.textContent = '−';
    minus.onclick = () => changeQty(c.id, -1);

    const qty = document.createElement('span');
    qty.textContent = c.qty;
    qty.style.minWidth = '28px';
    qty.style.textAlign = 'center';

    const plus = document.createElement('button');
    plus.className = 'btn';
    plus.style.background = '#fff';
    plus.style.color = 'var(--maroon)';
    plus.style.border = '1px solid rgba(128,0,0,0.06)';
    plus.textContent = '+';
    plus.onclick = () => changeQty(c.id, +1);

    ctrls.appendChild(minus);
    ctrls.appendChild(qty);
    ctrls.appendChild(plus);

    const right = document.createElement('div');
    right.innerHTML = `<strong>${formatPrice(item.price * c.qty)}</strong>`;

    li.appendChild(left);
    li.appendChild(ctrls);
    li.appendChild(right);

    cartItemsEl.appendChild(li);
  });

  totalPriceEl.textContent = formatPrice(getTotal());
}

/* Build WhatsApp message */
function buildWhatsAppMessage(){
  const name = (nameEl.value||'').trim();
  const phone = (phoneEl.value||'').trim();
  const address = (addressEl.value||'').trim();

  if(!name || !phone || !address){
    alert('فضلاً أكمل الاسم، رقم الهاتف، والعنوان قبل الإرسال.');
    return null;
  }
  if(cart.length === 0){
    alert('السلة فارغة، أضف منتجات أولاً.');
    return null;
  }

  const itemsText = cart.map(c => {
    const item = menuItems.find(m=>m.id===c.id);
    return `${item.name} × ${c.qty} — ${item.price * c.qty} ج.م`;
  }).join('\n');

  const total = getTotal();

  const msg = `طلب جديد من موقع حلويات أبو السعود
الاسم: ${name}
الهاتف: ${phone}
العنوان: ${address}

الطلبات:
${itemsText}

الإجمالي: ${total} ج.م

شكراً لتعاملكم — حلويات أبو السعود`;

  return encodeURIComponent(msg);
}

/* Events */
placeOrderBtn.addEventListener('click', () => {
  const encoded = buildWhatsAppMessage();
  if(!encoded) return;
  const waNumber = '201125933005'; // international form of 01125933005
  const url = `https://wa.me/${waNumber}?text=${encoded}`;
  window.open(url, '_blank');
});

/* smooth scroll CTA */
scrollToMenuBtn && scrollToMenuBtn.addEventListener('click', () => {
  document.getElementById('menu').scrollIntoView({behavior: 'smooth'});
});

/* Init */
renderMenu();
renderCart();

/* Expose for debugging */
window.app = { menuItems, cart, addToCart, renderCart };
