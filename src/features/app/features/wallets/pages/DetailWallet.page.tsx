import {useParams} from "react-router";
import {WalletFormPage} from "../components";

const DetailWallet = () => {
  const {id} = useParams<{id: string}>();

  return <WalletFormPage id={id} />;
};

export default DetailWallet;
