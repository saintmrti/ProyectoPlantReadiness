import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import MachinesForm from "../components/Forms/MachinesForm";
import { summaryMachines } from "../selectors/machines";
import { machinesRequest } from "../slices/machines";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

const Advance = () => {
  const dispatch = useDispatch();
  const { idProyecto, idEntregable, idFase } = useParams();
  const machines = useSelector(summaryMachines);
  const isFetchingInsert = useSelector(
    (state) => state.advance.isFetchingInsert
  );
  const { isFetching, didError } = useSelector((state) => state.phase);
  const advanceState = useSelector((state) => state.setAdvance);

  const filterMachines = _.filter(
    machines,
    (item) => item.idFase === parseInt(idFase)
  );

  useEffect(() => {
    dispatch(machinesRequest({ idProyecto }));
  }, [dispatch, idProyecto]);

  return (
    <div className="w-full">
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <Error />
      ) : (
        <MachinesForm
          idEntregable={idEntregable}
          idProyecto={idProyecto}
          fases={filterMachines}
          isFetching={isFetchingInsert}
          advanceState={advanceState}
        />
      )}
    </div>
  );
};

export default Advance;
