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
      console.log(cartListData);
      renderCartList();
    })
    .catch((err) => {
      console.log(err);
    });
}
