const processSale = (
  getProduct,
  getProductRestockLevel,
  sendAlert,
  productId,
  quantity
) => {
  if (getProduct().stock - quantity <= getProductRestockLevel()) {
    sendAlert("Please order more of product 811");
  }
};

module.exports = processSale;
