const ProgressBar = ({ currentProgress, goal }) => {
  const percentComplete = (currentProgress / goal) * 100;

  let colorClass = "bg-red-500";

  return (
    <div className="w-full h-4 bg-gray-200 rounded">
      <div
        className={`h-full transition-all ease-in-out duration-500 rounded-l ${colorClass}`}
        style={{ width: `${percentComplete}%` }}
      />
    </div>
  );
};

export default ProgressBar;
