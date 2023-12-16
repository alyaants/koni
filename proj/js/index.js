const list = document.querySelector(".list");
const items = document.querySelectorAll(".prod-item");
const listItems = document.querySelectorAll(".list__item");
function filter() {
  list.addEventListener("click", (event) => {
    const targetId = event.target.dataset.id;
    const target = event.target;
    console.log("ghghhg");

    if (target.classList.contains("list__item")) {
      listItems.forEach((listItem) => listItem.classList.remove("active"));
      target.classList.add("active");
    }

    switch (targetId) {
      case "all":
        showAllItems();
        break;
      case "corma":
      case "musli":
      case "podcorm":
        filterItems(targetId);
        break;
    }
  });
}

function showAllItems() {
  items.forEach((item) => {
    item.style.display = "block";
  });
}

function filterItems(className) {
  const itemsArray = Array.from(items);
  itemsArray.forEach((item) => {
    if (item.classList.contains(className)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

filter();

// поиск по товарам
const inputSearch = document.getElementById("search");
inputSearch.addEventListener("input", search);

function search() {
  console.log("sxsxsxs");
  const input = inputSearch.value.toLowerCase();
  const products = document.querySelectorAll(".prod-item");

  products.forEach((product) => {
    const searchDescr = product
      .querySelector(".prod-descr")
      .textContent.toLowerCase();

    if (searchDescr.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

