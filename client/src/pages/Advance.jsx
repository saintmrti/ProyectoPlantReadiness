import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import MachinesForm from "../components/Forms/MachinesForm";
import { fetchPhaseRequest } from "../slices/phase";

const Advance = () => {
  const dispatch = useDispatch();
  const { idEntregable, idGrupo } = useParams();
  const { list: fases } = useSelector((state) => state.phase);

  const filterFases = _.filter(
    fases,
    (item) => item.idGrupo === parseInt(idGrupo)
  );

  useEffect(() => {
    dispatch(fetchPhaseRequest());
  }, [dispatch]);
  return (
    <div className="container mx-auto">
      <MachinesForm idEntregable={idEntregable} fases={filterFases} />
    </div>
  );
};

export default Advance;
