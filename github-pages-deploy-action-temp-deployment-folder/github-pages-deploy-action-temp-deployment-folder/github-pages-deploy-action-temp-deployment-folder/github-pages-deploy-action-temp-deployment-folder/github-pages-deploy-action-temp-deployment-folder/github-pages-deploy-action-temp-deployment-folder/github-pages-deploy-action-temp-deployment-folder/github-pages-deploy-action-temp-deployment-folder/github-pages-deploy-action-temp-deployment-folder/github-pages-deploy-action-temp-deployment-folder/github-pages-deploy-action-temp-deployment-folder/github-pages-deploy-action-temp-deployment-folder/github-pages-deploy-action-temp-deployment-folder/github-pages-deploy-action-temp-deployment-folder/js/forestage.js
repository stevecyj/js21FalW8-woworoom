/**
 * DOM
 */

// product list
const productsWrap = document.querySelector("#productWrap");

/**
 * data
 */

let productsData = [];

/**
 * get products
 */

function getProductsData() {
  axios
    .get(`${baseUrl}/customer/${api_path}/products`)
    .then(function (res) {
      productsData = res.data.products;
      // console.log(productsData);
      renderProducts(productsData);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

// window.onload = getProductData();

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

/**
 * initial
 */
getProductsData();
