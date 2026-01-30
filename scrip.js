const menu = [
  {
    name: "بستاشيو أبو السعود (ربع كيلو)",
    price: 300,
    image: "images/pistachio-chocolate.jpg",
    description: "شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫"
  },
  {
    name: "دولمة أبو السعود (ربع كيلو)",
    price: 250,
    image: "images/dolma-pistachio.jpg",
    description: "دولمة فستق محشية بعناية، طرية ومغلفة بالسمن البلدي وطعمها تقيل ومميز 💚✨"
  }
];

let order = [];
const menuContainer = document.getElementById("menu-items");
const orderList = document.getElementById("order-list");
const totalEl = document.getElementById("total");

menu.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p>السعر: ${item.price} جنيه</p>
    <button onclick="addToOrder(${index})">أضف للطلب</button>
  `;
  menuContainer.appendChild(card);
});

function addToOrder(index) {
  const item = {...menu[index], quantity: 1};
  const exist = order.find(i => i.name === item.name);
  if (exist) { exist.quantity++; } else { order.push(item); }
  renderOrder();
}

function renderOrder() {
  orderList.innerHTML = "";
  let total = 0;
  order.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.innerHTML = `${item.name} × ${item.quantity} = ${item.price * item.quantity} جنيه`;
    orderList.appendChild(div);
  });
  totalEl.textContent = total;
}

document.getElementById("order-form").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if(order.length === 0){ alert("اختر صنفًا أولاً!"); return; }

  let orderText = order.map(i => `${i.name} × ${i.quantity}`).join("\n");
  let total = order.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const waMessage = `طلب جديد:
الاسم: ${name}
رقم الهاتف: ${phone}
العنوان: ${address}
الطلب:
${orderText}
الإجمالي: ${total} جنيه`;

  const waLink = `https://wa.me/201125933005?text=${encodeURIComponent(waMessage)}`;
  window.open(waLink, "_blank");
});
