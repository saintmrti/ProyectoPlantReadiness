import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

import MachinesForm from "../components/Forms/MachinesForm";

const Advance = () => {
  const { idEntregable, idGrupo } = useParams();
  const { list: fases } = useSelector((state) => state.phase);
  const isFetching = useSelector((state) => state.advance.isFetchingInsert);

  const filterFases = _.filter(
    fases,
    (item) => item.idGrupo === parseInt(idGrupo)
  );
  return (
    <div className="container mx-auto">
      <MachinesForm
        idEntregable={idEntregable}
        fases={filterFases}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Advance;
