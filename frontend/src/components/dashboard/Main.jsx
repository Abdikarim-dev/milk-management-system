import LineGraph from "./PieGraph";
import TopSales from "./TopSales";
import Overview from "./Overview";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import {
  fetchUsersSales,
  getSpecificTransactions,
} from "@/apicalls/transactions";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Main() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    litre: 0,
    price: 0,
  });
  // Memoize dataFromApi to prevent it from being recreated on every render
  const dataFromApi = useCallback(() => {
    let totalLitres = 0;
    let totalPrice = 0;

    data.forEach((user) => {
      totalLitres += eval(user.litre); // Note: using eval is generally not recommended due to security risks
      totalPrice += user.price;
    });

    setFormData({
      litre: totalLitres,
      price: totalPrice,
    });
  }, [data]); // Dependency on 'data'

  useEffect(() => {
    if (user?.userType === "admin") {
      const fetchData = async () => {
        const data = await fetchUsersSales();
        setData(data.message);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const response = await getSpecificTransactions();
        setUsers(response.data[0]);
      };
      fetchData();
    }
  }, []);

  // Separate useEffect to handle updates to 'data'
  useEffect(() => {
    if (data.length > 0) {
      // Check if data is not empty
      dataFromApi();
    }
  }, [data]); // Effect runs when 'data' changes

  const review = [
    {
      id: 1,
      name: user?.userType === "admin" ? "No of Users" : "No of Transactions",
      price: user?.userType === "admin" ? data.length : users?._count?.userId,
      review: "+20.1% from last month",
      icon: "Users",
    },
    {
      id: 2,
      name: "No of Litres",
      price: user?.userType === "admin" ?formData.litre:Number(users?._sum?.litre).toLocaleString(),
      review: "+180.1% from last month",
      icon: "LineChart",
    },
    {
      id: 3,
      name: "Total Revenue",
      price: user?.userType === "admin" ?formData.price:users?._sum?.price.toLocaleString() + ' SOS',
      review: "+19% from last month",
      icon: "HandCoins",
    },
  ];
  return (
    <div className="px-4 lg:px-10 pt-[1rem] w-full ">
      <header className="flex flex-col sm:flex-row gap-3 justify-between items-center pb-10">
        <h2 className="text-5xl font-semibold">Dashboard</h2>
        <div className="flex justify-between items-center gap-3">
          <span>
            Welcome to the dashboard
            {user?.sex === "male" ? " Mr." : " Missy."} {user?.fullname}
          </span>
          <button
            onClick={() => {
              dispatch(logoutUser());
              navigate("/");
              toast.error("Logged out successfully!");
            }}
            className="flex justify-center items-center gap-4 bg-red-600 px-10 py-2 rounded-lg text-white text-xl font-medium "
          >
            <span>
              <LogOut />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </header>
      <section className="flex flex-col gap-4  sm:flex-row justify-between items-center pt-[0.5rem]">
        {review.map((review) => (
          <Overview
            key={review.id}
            name={review.name}
            price={review.price}
            review={review.review}
            icon={review.icon}
          />
        ))}
      </section>
      <section className="pt-[1rem]">
        <div className=" flex flex-col lg:flex-row justify-between items-center gap-3">
          <BarGraph />
          {user?.userType === "admin" ? <PieGraph /> : <TopSales id={user?.id} />}
          {/* <TopSales /> */}
        </div>
      </section>
    </div>
  );
}

export default Main;
