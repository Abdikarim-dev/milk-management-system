import TopSales from "./TopSales";
import Overview from "./Overview";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  fetchUsersSales,
  getSpecificTransactions,
} from "@/apicalls/transactions";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getTanksData } from "@/apicalls/tanks";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function Main() {
  const [alert, setAlert] = useState(false);
  const [tank, setTank] = useState(0);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    litre: 0,
    price: 0,
  });

  const dataFromApi = useCallback(() => {
    let totalLitres = 0;
    let totalPrice = 0;

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((user) => {
        const litre = parseFloat(user.litre) || 0;
        const price = parseFloat(user.price) || 0;

        totalLitres += litre;
        totalPrice += price;
      });
    }

    setFormData({
      litre: totalLitres,
      price: totalPrice,
    });
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userType === "admin") {
        const data = await fetchUsersSales();
        const tankData = await getTanksData();

        setTank(tankData.data[0].quantity);
        setData(data.message);
      } else {
        const response = await getSpecificTransactions();
        const tankData = await getTanksData();

        setTank(tankData.data[0].quantity);
        setUsers(response.data[0]);
      }

      if (tank > 0) setAlert(true);
    };
    fetchData();
  }, [user, tank]);

  useEffect(() => {
    if (data.length > 0) {
      dataFromApi();
    }
  }, [data, dataFromApi]);

  const review = [
    {
      id: 0,
      name: "Current Tank Amount",
      price: Number(tank * 0.001).toLocaleString(),
      review: "Litres",
      icon: "Milk",
    },
    {
      id: 1,
      name: user?.userType === "admin" ? "No of Users" : "No of Transactions",
      price:
        user?.userType === "admin"
          ? data.length.toLocaleString() || 0
          : users?._count?.userId || 0,
      review: "Users",
      icon: "Users",
    },
    {
      id: 2,
      name: "No of Litres",
      price:
        user?.userType === "admin"
          ? (formData.litre * 0.001).toLocaleString() || 0
          : Number(users?._sum?.litre * 0.001 || 0).toLocaleString(),
      review: "Litres",
      icon: "LineChart",
    },
    {
      id: 3,
      name: "Total Revenue",
      price:
        user?.userType === "admin"
          ? ` $${formData.price.toLocaleString() || 0} `
          : ` $${users?._sum?.price.toLocaleString() || 0}`,
      review: "Dollar",
      icon: "HandCoins",
    },
  ];

  return (
    <div className={`px-4 lg:px-10  w-full ${tank <= 2000 ? "pt-4" : ""} `}>
      {alert && tank <= 2000 ? (
        <Alert variant="destructive" className="mb-4">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>
            "Fuustada waxaa ku jirta tira aad u yar oo{" "}
            <span className="font-black">{Number(tank).toLocaleString()}</span>{" "}
            fadlan kusoo shub fuustada caano"
          </AlertTitle>
        </Alert>
      ) : null}
      {/* <header className="flex flex-col sm:flex-row gap-3 justify-between items-center pb-2">
        <h2 className="text-xl font-semibold"></h2>
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
            className="flex justify-center items-center gap-4 bg-red-600 px-10 py-2 rounded-lg text-white text-xl font-medium"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </header> */}
      <section className="flex flex-col gap-1 sm:flex-row justify-between items-center pt-[0.5rem]">
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
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
          {user?.userType === "admin" ? (
            <>
              <BarGraph />
              <PieGraph />
            </>
          ) : (
            <>
              <LineGraph id={user?.id || 0} />
              <TopSales id={user?.id || 0} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Main;
