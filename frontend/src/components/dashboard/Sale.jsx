function Sale({ img, name, email, price }) {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="flex gap-5 ">
        <div>
          <img src={img} className="rounded-full w-[40px] h-[40px]" alt="" />
        </div>
        <div>
          <p className="text-md font-semibold">{name}</p>
          <p className="text-[#82828A]">{email}</p>
        </div>
      </div>

      <div className="text-xl font-semibold">{price}</div>
    </div>
  );
}

export default Sale;
