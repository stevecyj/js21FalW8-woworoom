/**
 * DOM
 */

const productsWrap = document.querySelector("#productWrap"); // product list
const productSelect = document.querySelector("#productSelect"); // dropdown select
const shoppingCartTable = document.querySelector("#shoppingCart-table"); // cart table
const shoppingCartList = document.querySelector("#shoppingCartList"); // cart list
const totalAmount = document.querySelector("#totalAmount"); // total amount

/**
 * data
 */

let productsData = [];
let cartListData = {};

/**
 * 千分位
 */

function toThousandComma(num) {
  let parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/**
 * render products list
 */

function renderProducts(data) {
  // 渲染產品卡片
  let cardStr = ``;
  data.forEach((item) => {
    let originPrice = toThousandComma(item.origin_price);
    let price = toThousandComma(item.price);
    cardStr += `
    <li class="productCard">
      <h4 class="productType">新品</h4>
      <img src="${item.images}" alt="">
      <a href="" class="addCart" data-productId=${item.id}>加入購物車</a>
      <h3 class="titleOverFlow">${item.title}</h3>
      <del class="originPrice">NT$${originPrice}</del>
      <p class="nowPrice">NT$${price}</p>
    </li>`;
  });
  productsWrap.innerHTML = cardStr;
}

// render options
function renderOptions(data) {
  let selectBeforeStr = `<option value="全部" selected>全部</option>`;
  let selectItemStr = ``;
  let arr = [];
  data.forEach((item) => {
    arr.push(item.category);
  });
  let arrSet = new Set(arr);
  arr = [...arrSet];
  // console.log(arrSet, arr);
  arr.forEach((item) => {
    selectItemStr += `<option value="${item}">${item}</option>`;
  });
  let selectStr = selectBeforeStr + selectItemStr;
  productSelect.innerHTML = selectStr;
}

/**
 * search filter
 */

function searchFilter(selected) {
  let value = selected.value;
  if (value === "全部") {
    renderProducts(productsData);
  } else {
    let selectResult = productsData.filter((item) => {
      return item.category === value;
    });
    // console.log(selectResult);
    renderProducts(selectResult);
  }
}

/**
 * render cart list
 */

function renderCartList() {
  let carts = cartListData.carts;
  let cartsListStr = ``;

  carts.forEach((item) => {
    let price = toThousandComma(item.product.price);
    let amount = toThousandComma(item.product.price * item.quantity);
    cartsListStr += `
    <tr>
        <td>
          <div class="cardItem-title">
            <img src="${item.product.images}" alt="產品照片" />
            <p>${item.product.title}</p>
          </div>
        </td>
        <td>NT$${price}</td>
        <td>${item.quantity}</td>
        <td>NT$${amount}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons"> clear </a>
        </td>
    </tr>
    `;
  });

  shoppingCartList.innerHTML = cartsListStr;
}

/**
 * initial
 */
getProductsData();
getCartList();
