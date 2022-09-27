const assert = require("assert");
const processSale = require("../src/index");

describe("Product sold - alert", () => {
    it(`send alert when product is equal to restock level`, () => {
        let alertMessage = undefined;
        const getProduct = () => {return {productId: 811, stock: 25 }};
        const getProductRestockLevel = () => {return 24};
        const sendAlert = (message) => {alertMessage = message};
        processSale(getProduct, getProductRestockLevel, sendAlert, 811, 1);
        assert.strictEqual(alertMessage, "Please order more of product 811");
    })
})