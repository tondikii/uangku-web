import {Button} from "@/components/atoms";
import type {FC} from "react";
import {FiPlus} from "react-icons/fi";
import {Link} from "react-router";

const AddButton: FC = () => {
  return (
    <Link to="create" className="absolute bottom-6 right-6 z-50">
      <Button size="lg" className="btn-circle shadow-2xl">
        <FiPlus size={24} />
      </Button>
    </Link>
  );
};
export default AddButton;
