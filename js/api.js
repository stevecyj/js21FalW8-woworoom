const api_path = "steve-wowo";
const token = "jnhR4ufJNYgxYN00E0M9NmHWWe62";
const baseUrl = "https://livejs-api.hexschool.io/api/livejs/v1";
const config = {
  headers: {
    authorization: token,
  },
};

/**
 * forestage
 * get products
 */

function getProductsData() {
  axios
    .get(`${baseUrl}/customer/${api_path}/products`)
    .then(function (res) {
      productsData = res.data.products;
      // console.log(productsData);
      renderProducts(productsData);
      renderOptions(productsData);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

/**
 * get cart list
 */

function getCartList() {
  const url = `${baseUrl}/customer/${api_path}/carts`;
  axios
    .get(url)
    .then((res) => {
      cartListData = res.data;
      // console.log(cartListData);
      renderCartList();
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * calc cart list item count
 */

function calcCartListItemCount(calcConfig) {
  const url = `${baseUrl}/customer/${api_path}/carts`;
  axios
    .patch(url, calcConfig)
    .then((res) => {
      cartListData = res.data;
      // console.log(cartListData);
      renderCartList();
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * add product to cart
 */

function addProductToCart(addConfig) {
  const url = `${baseUrl}/customer/${api_path}/carts`;

  axios
    .post(url, addConfig)
    .then((res) => {
      cartListData = res.data;
      // console.log(cartListData);
      // console.log(res);
      renderCartList();
      showSuccess("成功加入購物車！");
    })
    .catch((err) => {
      console.log(err);
      showError(err);
    });
}

/**
 * delete product from cart
 */

function delProductFromCart(cartId) {
  const url = `${baseUrl}/customer/${api_path}/carts/${cartId}`;

  axios
    .delete(url)
    .then((res) => {
      cartListData = res.data;
      // console.log(cartListData);
      renderCartList();
      showSuccess("成功刪除商品！");
    })
    .catch((err) => {
      console.log(err);
      showError(err);
    });
}

/**
 * delete all product from cart
 */

function deleteAll() {
  const url = `${baseUrl}/customer/${api_path}/carts`;

  axios
    .delete(url)
    .then((res) => {
      cartListData = res.data;
      // console.log(cartListData);
      renderCartList();
      showSuccess("成功清空購物車！");
    })
    .catch((err) => {
      console.log(err);
      showError(err);
    });
}

/**
 * submit order
 */

function submitOrder(orderConfig) {
  const url = `${baseUrl}/customer/${api_path}/orders`;

  axios
    .post(url, orderConfig)
    .then((res) => {
      // cartListData = res.data;
      // console.log(cartListData);
      getCartList();
      showSuccess("成功送出訂單！");
      orderInfoForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * backstage
 * get orders
 */

// get orderList
function getOrderList() {
  const url = `${baseUrl}/admin/${api_path}/orders`;
  axios
    .get(url, config)
    .then((res) => {
      ordersData = res.data.orders;
      console.log(ordersData);
      renderOrder();
    })
    .catch((err) => {
      showError(err);
      // console.log(err.response);
    });
}

// milliseconds to date
function calcOrderDay(num) {
  num = num * 1000;
  let date = new Date(num);

  let yearStr = date.getFullYear();
  let monthStr = date.getMonth() + 1;
  let dateStr = date.getDate();

  if (monthStr < 10) {
    monthStr = "0" + monthStr;
  }
  if (dateStr < 10) {
    dateStr = "0" + dateStr;
  }

  let str = `${yearStr}/${monthStr}/${dateStr}`;
  return str;
}
