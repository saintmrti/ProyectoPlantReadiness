const ProgressBar = ({ rubro, real, plan, total }) => {
  const percentReal = Math.round((real / total) * 100);
  const percentPlan = Math.round((plan / total) * 100);

  return (
    <div className="flex">
      <div className="flex flex-col w-28 justify-center">
        <div className="text-base">{rubro}</div>
        <div className="text-base">
          Total: <span className="font-semibold">{total ? total : 0}</span>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex mb-1">
          <div className="text-sm w-12">Plan: </div>
          <div className="w-full h-5 bg-gray-200 rounded">
            <div
              className="h-full transition-all ease-in-out duration-500 rounded flex items-center justify-center text-white font-semibold text-sm"
              style={{
                width: `${
                  percentPlan ? (percentPlan > 100 ? 100 : percentPlan) : 0
                }%`,
                backgroundColor: "#303F9F",
              }}
            >
              {percentPlan === 0 ? " " : plan}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="text-sm w-12">Real: </div>
          <div className="w-full h-5 bg-gray-200 rounded">
            <div
              className="h-full transition-all ease-in-out duration-500 rounded flex items-center justify-center text-white font-semibold text-sm"
              style={{
                width: `${
                  percentReal ? (percentReal > 100 ? 100 : percentReal) : 0
                }%`,
                backgroundColor: `${real >= plan ? "#00b978" : "#f44336"}`,
              }}
            >
              {percentReal > 100 ? "En meta" : real === 0 ? "" : real}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
