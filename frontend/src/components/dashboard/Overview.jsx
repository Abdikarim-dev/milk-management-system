import { Users, LineChart, HandCoins } from 'lucide-react';

const icons = {
  Users: Users,
  LineChart: LineChart,
  HandCoins: HandCoins
};
function Overview({ name, price, review, icon }) {
  const Icon = icons[icon]; // Dynamically determine the icon
  return (
    <div className="w-[260px] lg:w-[300px]  flex justify-between border border-[#E4E4E7] rounded-lg px-4 py-3">
      <div>
        <h3 className="pb-3 text-lg">{name}</h3>
        <p className="text-3xl font-semibold">{price}</p>
        <p className="text-[#82828A] text-md">{review}</p>
      </div>
      <div>
        {< Icon />}
      </div>
    </div>
  );
}

export default Overview;
