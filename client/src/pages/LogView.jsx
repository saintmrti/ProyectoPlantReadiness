import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LogsTable from "../components/Tables/LogsTable";
import { fetchLogsRequest } from "../slices/logs";
import { getSummaryLogs } from "../selectors/logs";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

const LogView = () => {
  const dispatch = useDispatch();
  const { idProyecto } = useParams();

  const logs = useSelector(getSummaryLogs);
  const { isFetching, didError } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogsRequest({ idProyecto }));
  }, [dispatch, idProyecto]);
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <Error />
      ) : (
        <LogsTable idProyecto={idProyecto} list={logs} />
      )}
    </>
  );
};

export default LogView;
