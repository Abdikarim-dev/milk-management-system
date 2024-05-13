import LineGraph from "./PieGraph";
import TopSales from "./TopSales";
import Overview from "./Overview";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { fetchUsersSales } from "@/apicalls/transactions";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Main() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    litre: 0,
    price: 0,
  })
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
    const fetchData = async () => {
      const data = await fetchUsersSales();
      setData(data.message);
    };
    fetchData();
  }, []);
  
  // Separate useEffect to handle updates to 'data'
  useEffect(() => {
    if (data.length > 0) { // Check if data is not empty
      dataFromApi();
    }
    
  }, [data]); // Effect runs when 'data' changes
  const { user } = useSelector((state) => state.user);
  const review = [
    {
      id: 1,
      name: "No of Users",
      price: data.length,
      review: "+20.1% from last month",
      icon: "Users",
    },
    {
      id: 2,
      name: "Sales",
      price: formData.litre,
      review: "+180.1% from last month",
      icon: "LineChart",
    },
    {
      id: 3,
      name: "Total Revenue",
      price: formData.price,
      review: "+19% from last month",
      icon: "HandCoins",
    },
  ];
  return (
    <div className="px-4 lg:px-10 pt-[1rem] w-full lg:w-[85%]">
      <header className="flex flex-col sm:flex-row gap-3 justify-between items-center pb-10">
        <h2 className="text-5xl font-semibold">Dashboard</h2>
        <div className="flex justify-between items-center gap-3">
          <span>Welcome to the dashboard Miss. {user.fullname}</span>
          <button onClick={()=>{
            dispatch(logoutUser())
            navigate(-1)
            toast.error('Logged out successfully!')
          }} className="flex justify-center items-center gap-4 bg-red-600 px-10 py-2 rounded-lg text-white text-xl font-medium ">
          <span><LogOut /></span>
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
          <BarGraph/>
          <PieGraph />
          {/* <TopSales /> */}
        </div>
      </section>
    </div>
  );
}

export default Main;
