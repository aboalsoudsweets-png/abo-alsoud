/* script.js
   - Dynamic menu rendering to match the screenshot layout exactly
   - Cart handling (in-memory)
   - Build WhatsApp message and open chat with store
   - Editable menuItems array below
*/

/* ---------------------------
   Editable menu array
   تعديل الأصناف هنا - يمكن إضافة/تعديل/حذف
----------------------------*/
const menuItems = [
   
   {
    id: '1',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/9.jpg' 
  }
   ,
 {
    id: '2',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/2.jpg' 
  }
   ,
 {
    id: '3',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/16.jpg' 
  }
   ,
 {
    id: '4',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/4.jpg' 
  }
   ,
 {
    id: '5',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/8.jpg' 
  }
   ,
 {
    id: '6',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/22.jpg' 
  }
   ,
 {
    id: '7',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/7.jpg' 
  }
   ,
 {
    id: '8',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/5.jpg' 
  }
   ,
 {
    id: '9',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/1.jpg'
  }
   ,
 {
    id: '10',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/10.jpg' 
  }
   ,
 {
    id: '11',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/11.jpg' 
  }
   ,
 {
    id: '12',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/12.jpg'
  }
   ,
 {
    id: '13',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/13.jpg' 
  }
   ,
 {
    id: '14',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/14.jpg' 
  }
   ,
 {
    id: '15',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/15.jpg' 
  }
   ,
 {
    id: '16',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/3.jpg' 
  }
   ,
 {
    id: '17',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/17.jpg' 
  }
   ,
 {
    id: '18',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/18.jpg' 
  }
   ,
 {
    id: '19',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/19.jpg'
  }
   ,
 {
    id: '20',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/20.jpg'
  }
   ,
 {
    id: '21',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/21.jpg' 
  }
   ,
 {
    id: '22',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/6.jpg' 
  }
   ,
 {
    id: '23',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/23.jpg' 
  }
   ,
 {
    id: '24',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/24.jpg' 
  }
   ,
 {
    id: '27',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '28',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '29',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '30',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '31',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '32',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG'
  }
   ,
 {
    id: '33',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG'
  }
   ,
 {
    id: '34',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '35',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '36',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '37',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '38',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG' 
  }
   ,
 {
    id: '39',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG'
  }
   ,
 {
    id: '40',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio1.JPG'
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

/* Render menu cards */
function renderMenu(){
  menuGrid.innerHTML = '';
  menuItems.forEach(item => {
    const frame = document.createElement('div');
    frame.className = 'card-frame';

    const card = document.createElement('article');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'photo';
    img.alt = item.name;
    img.src = item.img || '';
    img.onerror = function(){
      // fallback colored block if image not found
      this.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.style.height = '220px';
      placeholder.style.background = '#f3e7de';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.innerHTML = `<strong style="color:var(--maroon)">${item.name}</strong>`;
      card.insertBefore(placeholder, card.firstChild);
    };

    card.appendChild(img);

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



const sliderSection = document.getElementById('scroll-images');
if (sliderSection) {
  sliderSection.remove();
}
