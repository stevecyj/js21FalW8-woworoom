/**
 * DOM
 */

const orderBody = document.querySelector("#orderBody");
const orderInfo = document.querySelector("#orderInfo");
const orderPageTable = document.querySelector(".orderPage-table");

// order data
let ordersData = [];

/**
 * sweet alert
 */

function showSuccess(msg) {
  Swal.fire({
    title: msg,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

function showError(err) {
  if (
    err.response.status === 400 ||
    err.response.status === 403 ||
    err.response.status === 404
  ) {
    Swal.fire({
      title: `${err.response.data.message}`,
      icon: "error",
      confirmButtonText: "確定",
    });
  }
}

/**
 * C3.js
 */

// pre handle c3 format

function renderC3() {
  // gray chart when no order
  if (ordersData.length === 0) {
    let chart = c3.generate({
      bindto: "#chart", // HTML 元素綁定
      data: {
        type: "pie",
        columns: [["目前沒有資料", 1]],
        colors: {
          目前沒有資料: "#eeeeee",
        },
      },
    });
  } else {
    let arr = [];
    ordersData.forEach((item) => {
      item.products.forEach((product) => {
        let obj = {
          productName: "",
          productIncome: 0,
        };
        obj.productName = product.title;
        obj.productIncome = product.quantity * product.price;
        arr.push(obj);
      });
    });

    let obj = {};
    arr.forEach((item) => {
      let name = item.productName;
      if (obj[name] === undefined) {
        obj[name] = item.productIncome;
      } else {
        obj[name] += item.productIncome;
      }
    });

    let columns = [];

    let keys = Object.keys(obj);
    let values = Object.values(obj);

    for (let i = 0; i < keys.length; i++) {
      let arr = [];
      arr.push(keys[i]);
      arr.push(values[i]);
      columns.push(arr);
    }

    // sort from max to min
    columns.sort((a, b) => {
      return b[1] - a[1];
    });

    // get top 3 items
    let others = [];
    others = columns.splice(3);

    // get total count outside top3
    let othersPrice = 0;
    others.forEach((item) => {
      othersPrice += item[1];
    });

    if (others.length > 0) {
      columns.push(["其他", othersPrice]);
    }

    let colorsArr = ["#301E5F", "#5434A7", "#9D7FEA", "#DACBFF"];
    let colorsObj = {};
    // 製作出圖表，賣最多的品項顏色最深，「其他」是雜項的集合所以顏色最淺
    columns.forEach((item, index) => {
      if (colorsObj[item[0]] === undefined) {
        colorsObj[item[0]] = colorsArr[index];
      }
    });

    let chart = c3.generate({
      bindto: "#chart",
      data: {
        type: "pie",
        columns: columns,
        colors: colorsObj,
      },
    });
  }
}

// 渲染訂單列表 + 排序
function renderOrder() {
  if (ordersData.length === 0) {
    orderInfo.innerHTML = "目前沒有任何訂單！";
    orderPageTable.classList.add("d-none");
  } else if (ordersData.length !== 0) {
    orderInfo.innerHTML = "";
    orderPageTable.classList.remove("d-none");

    // 訂購日期越早的訂單(優先處理)排越上面
    ordersData.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    let str = ``;
    ordersData.forEach((item) => {
      let timeStr = calcOrderDay(item.createdAt);
      let productsStr = ``;
      item.products.forEach((products) => {
        productsStr += `<li>${products.title}：${products.quantity}</li>`;
      });

      str += `  <tr>
      <td>${item.createdAt}</td>
      <td>
          <p>${item.user.name}</p>
          <p>${item.user.tel}</p>
      </td>
      <td>${item.user.address}</td>
      <td>${item.user.email}</td>
      <td>
        <ul>
          ${productsStr}
        </ul>
      </td>
      <td>${timeStr}</td>
      <td class="orderStatus">
          <a href="#" class="orderStatus-Btn" data-id="${
            item.id
          }" data-state="${item.paid}">${item.paid ? `已處理` : `未處理`}</a>
      </td>
      <td>
          <input type="button" class="delSingleOrder-Btn" data-id="${
            item.id
          }"value="刪除">
      </td>
  </tr>`;
    });
    // console.log(str);
    orderBody.innerHTML = str;
  }

  renderC3();
}

// let chart = c3.generate({
//   bindto: "#chart", // HTML 元素綁定
//   data: {
//     type: "pie",
//     columns: [
//       ["Louvre 雙人床架", 1],
//       ["Antony 雙人床架", 2],
//       ["Anty 雙人床架", 3],
//       ["其他", 4],
//     ],
//     colors: {
//       "Louvre 雙人床架": "#DACBFF",
//       "Antony 雙人床架": "#9D7FEA",
//       "Anty 雙人床架": "#5434A7",
//       其他: "#301E5F",
//     },
//   },
// });

getOrderList();
// console.log("123");
// console.log(orderBody);
