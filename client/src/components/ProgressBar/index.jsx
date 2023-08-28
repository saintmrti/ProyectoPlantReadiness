const ProgressBar = ({ rubro, real, plan, total }) => {
  const percent = Math.round((real / total) * 100);

  return (
    <>
      <div className="flex justify-between">
        <p className="xs">{rubro}</p>
        {real ?? plan ? (
          <p className="xs">
            Real: {real} / Plan: {plan}
          </p>
        ) : null}
      </div>
      <div className="flex items-center">
        <div className="w-full h-5 bg-gray-200 rounded">
          <div
            className="h-full transition-all ease-in-out duration-500 rounded flex items-center justify-center text-white font-semibold text-sm"
            style={{
              width: `${percent ? (percent > 100 ? 100 : percent) : 0}%`,
              backgroundColor: `${real >= plan ? "#00b978" : "#f44336"}`,
            }}
          >
            {percent > 100 ? "En meta" : real === 0 ? "" : real}
          </div>
        </div>
        <div className="ml-2 text-sm text-gray-500">{total ? total : 0}</div>
      </div>
    </>
  );
};

export default ProgressBar;
