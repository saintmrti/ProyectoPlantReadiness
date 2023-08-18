import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

import MachinesForm from "../components/Forms/MachinesForm";

const Advance = () => {
  const { idEntregable, idGrupo } = useParams();
  const { list: fases } = useSelector((state) => state.phase);
  const isFetching = useSelector((state) => state.advance.isFetchingInsert);
  const advanceState = useSelector((state) => state.setAdvance);

  const filterFases = _.filter(
    fases,
    (item) => item.idGrupo === parseInt(idGrupo)
  );
  return (
    <div className="w-full">
      <MachinesForm
        idEntregable={idEntregable}
        fases={filterFases}
        isFetching={isFetching}
        advanceState={advanceState}
      />
    </div>
  );
};

export default Advance;
