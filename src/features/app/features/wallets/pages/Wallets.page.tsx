import {Col, Row, Text} from "@/components/atoms";
import {useFetchWallets} from "../hooks";
import {formatIdr} from "@/utils/formatter.utils";
import type {Wallet} from "@/types/wallet.types";
import {WalletsList} from "../components";
import {AddButton, ScreenHeader} from "@/features/app/components";

const WalletsPage = () => {
  const {data} = useFetchWallets();

  const totalBalance =
    data?.reduce((acc: number, curr: Wallet) => acc + curr.balance, 0) || 0;

  return (
    <Col className="flex-col h-full relative overflow-hidden">
      <ScreenHeader title="WALLETS OVERVIEW">
        <Row className="justify-between gap-1">
          <Text color="base-80" size="xs">
            Total Balance
          </Text>
          <Text color="base-80" size="xs">
            {formatIdr(totalBalance)}
          </Text>
        </Row>
      </ScreenHeader>

      <WalletsList data={data} />

      <AddButton />
    </Col>
  );
};

export default WalletsPage;
