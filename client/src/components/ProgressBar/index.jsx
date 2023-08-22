const ProgressBar = ({ currentProgress, goal }) => {
  const percentComplete = (currentProgress / goal) * 100;

  return (
    <div className="w-full h-4 bg-gray-200 rounded">
      <div
        className={`h-full transition-all ease-in-out duration-500 rounded-l bg-red-500`}
        style={{ width: `${percentComplete}%` }}
      />
    </div>
  );
};

export default ProgressBar;
