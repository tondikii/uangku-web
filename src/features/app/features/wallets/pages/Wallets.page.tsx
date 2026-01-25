import {Col, Row, Text} from "@/components/atoms";
import {useFetchWallets} from "../hooks";
import {formatIdr} from "@/utils/formatter.utils";
import type {Wallet} from "@/types/wallet.types";
import {
  AddButton,
  ScreenEmpty,
  ScreenLoader,
  ScreenHeader,
  ScreenError,
} from "@/features/app/components";
import {WalletsList} from "../components";

const WalletsPage = () => {
  const {data, loading, error, success} = useFetchWallets();

  const totalBalance =
    data?.reduce((acc: number, curr: Wallet) => acc + curr.balance, 0) || 0;

  const renderContent = () => {
    if (loading) {
      return <ScreenLoader />;
    }
    if (success && data.length < 1) {
      return <ScreenEmpty entityName="wallet" />;
    }
    if (error) {
      return <ScreenError errorMessage={error} />;
    }
    return <WalletsList data={data} />;
  };

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

      {renderContent()}

      <AddButton />
    </Col>
  );
};

export default WalletsPage;
