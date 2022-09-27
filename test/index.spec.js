const assert = require("assert");
const {
  processSale,
  getProductRestockLevel,
  getSalesLastMonth,
} = require("../src/index");
const salesData = require("./data");

describe("Product sold - alert", () => {
  it(`send alert when product is equal to restock level`, () => {
    let alertMessage = undefined;
    const getProductMock = () => {
      return { productId: 811, stock: 25 };
    };
    const getProductRestockLevelMock = () => {
      return 24;
    };
    const sendAlertMock = (message) => {
      alertMessage = message;
    };
    processSale(
      getProductMock,
      getProductRestockLevelMock,
      undefined,
      sendAlertMock,
      811,
      1
    );
    assert.strictEqual(alertMessage, "Please order more of product 811");
  });
});

describe("Product sold - no alert", () => {
  it(`not send alert when product is more than restock level`, () => {
    let alertMessage = undefined;
    const getProductMock = () => {
      return { productId: 811, stock: 26 };
    };
    const getProductRestockLevelMock = () => {
      return 24;
    };
    const sendAlertMock = (message) => {
      alertMessage = message;
    };
    processSale(
      getProductMock,
      getProductRestockLevelMock,
      undefined,
      sendAlertMock,
      811,
      1
    );
    assert.strictEqual(alertMessage, undefined);
  });
});

describe("Request restock level", () => {
  const getSalesLastMonthMock = () => {
    return 15;
  };
  it(`should return the restock level`, () => {
    const product = { leadTime: 14 };
    assert.strictEqual(
      getProductRestockLevel(getSalesLastMonthMock, product),
      7
    );
  });

  it(`should return the restock level`, () => {
    const productId = 811;
    const querySalesData = (productId) => {
      return salesData;
    };
    assert.strictEqual(getSalesLastMonth(querySalesData, productId), 16);
  });

  it(`should query sales data`, async () => {
    const productId = 811;
    const querySalesData = async (productId) => {
      let data = [];
      await fetch(
        `https://gjtvhjg8e9.execute-api.us-east-2.amazonaws.com/default/sales?productId=${productId}&startDate=7%2F17%2F2020&endDate=7%2F27%2F2020`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          data = myJson;
          // console.log(data);
        });
      return data;
    };

    console.log(await querySalesData(811));
    assert.strictEqual(getSalesLastMonth(querySalesData, productId), 16);
    // assert.strictEqual(true, true);
  });
});
