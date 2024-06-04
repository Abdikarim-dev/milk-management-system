import { useEffect, useState } from "react";
import Sale from "./Sale.jsx";
import { getTransactionsByUser } from "@/apicalls/transactions.js";

const AMOUNT_PER_DHUCEY = 15000;
const transactionInfo = [
  {
    id: 0,
    name: "Maxaan kaa beecinaa",
    litre: "Select Amount of Litre",
    price: 0,
  },
  {
    id: 1,
    name: "Dhuceey",
    litre: 500,
    price: AMOUNT_PER_DHUCEY * 1,
  },
  {
    id: 2,
    name: "Dhalo",
    litre: 1000,
    price: AMOUNT_PER_DHUCEY * 2,
  },
  {
    id: 3,
    name: "Dhalo Iyo Dhucey",
    litre: 1500,
    price: AMOUNT_PER_DHUCEY * 3,
  },
  {
    id: 4,
    name: "2 Dhalo",
    litre: 2000,
    price: AMOUNT_PER_DHUCEY * 4,
  },
  {
    id: 5,
    name: "2 Dhalo Iyo Dhucey",
    litre: 2500,
    price: AMOUNT_PER_DHUCEY * 5,
  },
  {
    id: 6,
    name: "3 Dhalo",
    litre: 3000,
    price: AMOUNT_PER_DHUCEY * 6,
  },
  {
    id: 7,
    name: "3 Dhalo Iyo Dhucey",
    litre: 3500,
    price: AMOUNT_PER_DHUCEY * 7,
  },
  {
    id: 8,
    name: "4 Dhalo",
    litre: 4000,
    price: AMOUNT_PER_DHUCEY * 8,
  },
  {
    id: 9,
    name: "4 Dhalo Iyo Dhucey",
    litre: 4500,
    price: AMOUNT_PER_DHUCEY * 9,
  },
  {
    id: 10,
    name: "5 Dhalo",
    litre: 5000,
    price: AMOUNT_PER_DHUCEY * 10,
  },
  {
    id: 11,
    name: "5 Dhalo Iyo Dhucey",
    litre: 5500,
    price: AMOUNT_PER_DHUCEY * 11,
  },
  {
    id: 12,
    name: "6 Dhalo",
    litre: 6000,
    price: AMOUNT_PER_DHUCEY * 12,
  },
  {
    id: 13,
    name: "6 Dhalo Iyo Dhucey",
    litre: 6500,
    price: AMOUNT_PER_DHUCEY * 13,
  },
  {
    id: 14,
    name: "7 Dhalo",
    litre: 7000,
    price: AMOUNT_PER_DHUCEY * 14,
  },
  {
    id: 15,
    name: "7 Dhalo Iyo Dhucey",
    litre: 7500,
    price: AMOUNT_PER_DHUCEY * 15,
  },
  {
    id: 16,
    name: "8 Dhalo",
    litre: 8000,
    price: AMOUNT_PER_DHUCEY * 16,
  },
  {
    id: 17,
    name: "8 Dhalo Iyo Dhucey",
    litre: 8500,
    price: AMOUNT_PER_DHUCEY * 17,
  },
  {
    id: 18,
    name: "9 Dhalo",
    litre: 9000,
    price: AMOUNT_PER_DHUCEY * 18,
  },
  {
    id: 19,
    name: "9 Dhalo Iyo Dhucey",
    litre: 9500,
    price: AMOUNT_PER_DHUCEY * 19,
  },
  {
    id: 20,
    name: "10 Dhalo",
    litre: 10000,
    price: AMOUNT_PER_DHUCEY * 20,
  },
];

function TopSales({ id }) {
  const [transactions, setTransactions] = useState([]);
  const sales = [
    {
      id: 1,
      // img: "https://i.pinimg.com/564x/4b/cc/54/4bcc54ebe6d0e6700e3df3047c1129c8.jpg",
      name: "Iman Gadzhi",
      email: "imangadzhi@gmail.com",
      price: "+ $20,000.98",
    },
    {
      id: 2,
      // img: "https://i.pinimg.com/564x/89/8c/d6/898cd6082b8d4ff3f2b576140474b4ce.jpg",
      name: "Harry Potter",
      email: "harrypotter@gmail.com",
      price: "+ $2,000.98",
    },
    {
      id: 3,
      // img: "https://i.pinimg.com/564x/b1/4e/9b/b14e9be4b190e00bd0605e7bb2dd2190.jpg",
      name: "Katrina Omega",
      email: "katrinaomega@gmail.com",
      price: "+ $5,000.98",
    },
    {
      id: 4,
      // img: "https://i.pinimg.com/564x/09/3c/22/093c22dee18b0b297e9d4081b4947134.jpg",
      name: "Karishna Kapoor",
      email: "karishma@gmail.com",
      price: "+ $1,000.98",
    },
    {
      id: 5,
      // img: "https://i.pinimg.com/564x/be/ae/6b/beae6b7e4f6e29e2ceb8cf7e58122a8c.jpg",
      name: "Zheng Narruto",
      email: "zheng@gmail.com",
      price: "+ $4,000.98",
    },
  ];

  /**
   * Adds a new transaction to the state while ensuring it only keeps the latest five transactions.
   * @param {string} date - The date of the transaction in ISO format (e.g., '2024-05-15T13:28:04.825Z')
   * @param {any} data - The data associated with the transaction (could be any additional details)
   */
  /**
   * Processes an array of new transactions, each containing a createdAt date and other data.
   * @param {Array} newTransactions - Array of transaction objects each with a createdAt and data property.
   */
  const processTransactions = (newTransactions) => {
    // Sort new transactions by date in descending order (newest first)
    const sortedTransactions = newTransactions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Update the state: Add new transactions to the start of the array and limit the array to the latest five transactions
    setTransactions((prevTransactions) =>
      [...sortedTransactions, ...prevTransactions].slice(0, 5)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTransactionsByUser(id);

      processTransactions(response);
      console.log(transactions);
      // Function to reformat the array excluding specific properties
      const reformattedData = response?.map(
        ({ user: { createdAt, updatedAt, id, ...userRest }, ...rest }) => {
          return {
            ...rest, // Spread to include all other properties of the item
            ...userRest, // Spread to include all properties of the 'user' object, excluding the specified ones
          };
        }
      );
    };
    fetchData();
  }, []);
  return (
    <section className="w-full lg:w-1/3 h-[450px] border border-[#E4E4E7] rounded-lg px-4 py-5">
      <div>
        <div>
          <h2 className="text-xl pb-2 font-semibold">Recent Sales</h2>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 pt-4">
          {transactions.map((latest) => (
            <Sale
              key={latest.id}
              amount_info={"Amount"}
              price_info={"Price"}
              amount={latest.litre}
              price={latest.price}
              transactionInfo={transactionInfo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopSales;
