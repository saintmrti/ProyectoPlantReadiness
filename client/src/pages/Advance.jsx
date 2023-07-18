import MachinesForm from "../components/Forms/MachinesForm";
import { useParams } from "react-router-dom";

const Advance = () => {
  const { idEntregable } = useParams();
  return (
    <div className="container mx-auto">
      <MachinesForm idEntregable={idEntregable} />
    </div>
  );
};

export default Advance;
