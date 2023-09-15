import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import MachinesForm from "../components/Forms/MachinesForm";
import { fetchPhaseRequest } from "../slices/phase";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

const Advance = () => {
  const dispatch = useDispatch();
  const { idProyecto, idEntregable, idGrupo } = useParams();
  const { list: fases } = useSelector((state) => state.phase);
  const isFetchingInsert = useSelector(
    (state) => state.advance.isFetchingInsert
  );
  const { isFetching, didError } = useSelector((state) => state.phase);
  const advanceState = useSelector((state) => state.setAdvance);

  const filterFases = _.filter(
    fases,
    (item) => item.idGrupo === parseInt(idGrupo)
  );

  useEffect(() => {
    dispatch(fetchPhaseRequest({ idProyecto }));
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
          fases={filterFases}
          isFetching={isFetchingInsert}
          advanceState={advanceState}
        />
      )}
    </div>
  );
};

export default Advance;
