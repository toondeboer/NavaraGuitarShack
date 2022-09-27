const assert = require("assert");
const { processSale, getProductRestockLevel, getSalesLastMonth } = require("../src/index");
const salesData = require("./data")

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
    const querySalesData = (productId) => {return salesData}
    assert.strictEqual(
      getSalesLastMonth(querySalesData, productId),
      16
    );
  });
});

