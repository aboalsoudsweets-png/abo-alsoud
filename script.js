
/* Editable menu array */
const menuItems = [
  {
    id: 'dolma-250',
    name: 'دولمة أبو السعود (ربع كيلو)',
    price: 250,
    desc: 'دولمة فستق محشية بعناية، طرية ومغلفة بالسمن البلدي وطعمها تقيل ومميز 💚✨',
    img: 'images/dolma.jpg'
  },
  {
    id: 'pistachio-250',
    name: 'بستاشيو أبو السعود (ربع كيلو)',
    price: 300,
    desc: 'شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫',
    img: 'images/pistachio.jpg'
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
