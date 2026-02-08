import {useParams} from "react-router";
import {TransactionFormPage} from "../components";

const DetailTransaction = () => {
  const {id} = useParams<{id: string}>();

  return <TransactionFormPage id={id} />;
};

export default DetailTransaction;
