const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** All prices are stored in paise. Convert only for display. */
export const formatINR = (paise) => fmt.format(paise / 100);

export const discountPercent = (price, mrp) =>
  mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
