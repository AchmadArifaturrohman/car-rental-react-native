import React from "react";

export default function FormatCurrency({ amount }) {
  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatCurrency.format(amount);
}
