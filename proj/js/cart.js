const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const addToCartButtons = document.querySelectorAll(".prod-btn");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
});

// Функция для добавления товара в корзину
function addToCart(event) {
  const productElement = event.target.closest(".prod-item");
  if (productElement) {
      const productName = productElement.querySelector(".prod-descr p").textContent;
      const productPrice = productElement.querySelector("span").textContent;
      const productImg = productElement.querySelector("img").src;

      const productId = Date.now();

      const product = {
          id: productId,
          name: productName,
          price: productPrice,
          img: productImg, 
      };

      cart.push(product);

      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
  }
}






let isCartOpen = false; // состояние корзины

const cartButton = document.querySelector(".cart-btn");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);
const cartWrap = document.createElement("div");
cartWrap.classList.add("cart-wrap");
document.body.appendChild(cartWrap);

const cartHeader = document.createElement("div");
cartHeader.classList.add("cartHeader");
cartWrap.appendChild(cartHeader);

const titleCart = document.createElement("span");
titleCart.classList.add("titleCart");
titleCart.textContent = "Корзина";
cartHeader.appendChild(titleCart);

const closeButton = document.createElement("button");
closeButton.classList.add("closeButton");
closeButton.innerText = "✖";
cartHeader.appendChild(closeButton);

const listWrap = document.createElement("div");
listWrap.classList.add("listWrap");
cartWrap.appendChild(listWrap);

const cartList = document.createElement("ul");
cartList.className = "listUl";
listWrap.appendChild(cartList);

const total = document.createElement("span");
total.classList.add("total");
total.innerText = "Итого: ";
listWrap.appendChild(total);

cartButton.addEventListener("click", () => {
  if (isCartOpen) {
    cartWrap.style.display = "none";
    overlay.style.display = "none";
  } else {
    cartWrap.style.display = "block";
    overlay.style.display = "block";
    displayCart();
  }
  isCartOpen = !isCartOpen;
});

closeButton.addEventListener("click", () => {
  cartWrap.style.display = "none";
  overlay.style.display = "none";
  isCartOpen = false;
});

// удаление товаров в корзине и сумма
function displayCart() {
  const cartData = JSON.parse(localStorage.getItem("cart"));
  const cartList = document.querySelector(".listUl");

  cartList.innerHTML = "";

  let totalAmount = 0;

  if (cartData && cartData.length > 0) {
      cartData.forEach((item) => {
          const cartItem = document.createElement("li");

          // Создаем и добавляем img элемент
          const productImage = document.createElement("div");
          productImage.classList.add('productImage');
          const image = document.createElement("img");
          image.src = item.img;
          image.alt = item.name;
          cartItem.appendChild(productImage);
          productImage.appendChild(image);


          // Создаем и добавляем остальные элементы информации о товаре
          const productInfo = document.createElement("div");
          productInfo.classList.add("product-info");

          const productTitle = document.createElement("span");
          productTitle.textContent = `${item.name} — `;

          const productPrice = document.createElement("span");
          productPrice.textContent = item.price;

          productInfo.appendChild(productTitle);
          productInfo.appendChild(productPrice);

          cartItem.appendChild(productInfo);

          const removeBtn = document.createElement("button");
          removeBtn.classList.add("removeBtn");
          removeBtn.textContent = "Удалить";

          removeBtn.addEventListener("click", () => {
            const index = cartData.findIndex((cartItem) => cartItem.id === item.id);
            if (index !== -1) {
                cartData.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cartData)); 
        
                // Пересчитываем totalAmount после удаления товара
                totalAmount -= parseFloat(item.price);
        
                displayCart();
            }
        });

          cartItem.appendChild(removeBtn);
          cartList.appendChild(cartItem);

          totalAmount += parseFloat(item.price);
      });

      const total = document.querySelector(".total");
      totalAmount = parseFloat(totalAmount.toFixed(2));
      total.textContent = `Итого: ${totalAmount} BYN`;
  } else {
      const emptyCartMessage = document.createElement("p");
      emptyCartMessage.textContent = "Корзина пуста";
      cartList.appendChild(emptyCartMessage);

      const total = document.querySelector(".total");
      total.textContent = "Итого: 0 BYN";
  }
}

displayCart();