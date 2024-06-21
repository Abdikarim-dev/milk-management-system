function Sale({ amount_info, price_info, amount, price, transactionInfo }) {
  function findTransactionNameByPrice(inputPrice) {
    // Find the transaction that matches the price
    const transaction = transactionInfo.find(
      (transaction) => transaction.litre.toString() === inputPrice
    );

    // Return the transaction name if found, otherwise return a message indicating no match was found
    return transaction ? transaction.name : "No match found";
  }
  return (
    <div className="flex justify-between items-center gap-5">
      <div>
        <p className="text-md font-semibold">{amount_info}</p>
        <p className="text-[#82828A]">{price_info}</p>
      </div>
      <div>
        <p className="text-md font-semibold">
          {findTransactionNameByPrice(amount)}
        </p>
        <p className="text-[#82828A]">${price.toLocaleString()} </p>
      </div>
      {/* 
      <div className="text-xl font-semibold">{price}</div> */}
    </div>
  );
}

export default Sale;
