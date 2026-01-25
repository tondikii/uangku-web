import {Col, Li, Row, Text, Ul} from "@/components/atoms";
import type {Wallet} from "@/types/wallet.types";
import {formatDate, formatIdr} from "@/utils/formatter.utils";
import type {FC} from "react";
import {FiChevronRight} from "react-icons/fi";
import {Link} from "react-router";

interface WalletsListProps {
  data: Wallet[];
}

const WalletsList: FC<WalletsListProps> = ({data}) => {
  return (
    <Ul>
      {data.map((wallet: Wallet) => (
        <Link
          key={wallet.id}
          to={`/wallets/${wallet.id}`}
          className="border-b border-base-300 last:border-0"
        >
          <Li>
            <Col gap={1}>
              <Text weight="semibold">{wallet.name}</Text>
              <Text
                size="8px"
                color="base-60"
                weight="semibold"
                className="tracking-wider opacity-70"
              >
                UPDATED {formatDate(wallet.updatedAt)}
              </Text>
            </Col>

            <Row gap={4} className="items-center">
              <Text weight="semibold">{formatIdr(wallet.balance)}</Text>
              <FiChevronRight className="text-base-content/30 text-lg" />
            </Row>
          </Li>
        </Link>
      ))}
    </Ul>
  );
};
export default WalletsList;
