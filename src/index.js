function processSale(
  getProduct,
  getProductRestockLevel,
  getSalesLastMonth,
  sendAlert,
  productId,
  quantity
) {
  const product = getProduct();
  if (
    product.stock - quantity <=
    getProductRestockLevel(getSalesLastMonth, product)
  ) {
    sendAlert("Please order more of product 811");
  }
}

function getProductRestockLevel(getSalesLastMonth, product) {
  const salesLastMonth = getSalesLastMonth();
  const leadTime = product.leadTime;
  const dailySales = salesLastMonth / 30;
  return dailySales * leadTime;
}

function getSalesLastMonth(querySalesData, productId) {
  return querySalesData(productId).reduce((total, current) => total + current.quantity, 0);
}

module.exports = { processSale, getProductRestockLevel, getSalesLastMonth};
