let productData = [];

/**
 * get products
 */

function getData() {
  axios
    .get(`${baseUrl}/customer/${api_path}/products`)
    .then(function (res) {
      productData = res.data.products;
      console.log(productData);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

window.onload = getData();
