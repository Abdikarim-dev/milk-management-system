import Sale from "./Sale.jsx";

function TopSales() {
  const sales = [
    {
      id: 1,
      img: "https://i.pinimg.com/564x/4b/cc/54/4bcc54ebe6d0e6700e3df3047c1129c8.jpg",
      name: "Iman Gadzhi",
      email: "imangadzhi@gmail.com",
      price: "+ $20,000.98",
    },
    {
      id: 2,
      img: "https://i.pinimg.com/564x/89/8c/d6/898cd6082b8d4ff3f2b576140474b4ce.jpg",
      name: "Harry Potter",
      email: "harrypotter@gmail.com",
      price: "+ $2,000.98",
    },
    {
      id: 3,
      img: "https://i.pinimg.com/564x/b1/4e/9b/b14e9be4b190e00bd0605e7bb2dd2190.jpg",
      name: "Katrina Omega",
      email: "katrinaomega@gmail.com",
      price: "+ $5,000.98",
    },
    {
      id: 4,
      img: "https://i.pinimg.com/564x/09/3c/22/093c22dee18b0b297e9d4081b4947134.jpg",
      name: "Karishna Kapoor",
      email: "karishma@gmail.com",
      price: "+ $1,000.98",
    },
    {
      id: 5,
      img: "https://i.pinimg.com/564x/be/ae/6b/beae6b7e4f6e29e2ceb8cf7e58122a8c.jpg",
      name: "Zheng Narruto",
      email: "zheng@gmail.com",
      price: "+ $4,000.98",
    },
  ];
  return (
    <section className="w-full lg:w-1/3 h-[450px] border border-[#E4E4E7] rounded-lg px-4 py-5">
      <div>
        <div>
          <h2 className="text-xl pb-2 font-semibold">Recent Sales</h2>
          <p className="text-[#82828A]">You made 265 sales this month</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 pt-4">
          {sales.map((sale) => (
            <Sale
            key={sale.id}
              name={sale.name}
              img={sale.img}
              email={sale.email}
              price={sale.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopSales;
