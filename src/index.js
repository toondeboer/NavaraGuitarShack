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

module.exports = { processSale, getProductRestockLevel };
