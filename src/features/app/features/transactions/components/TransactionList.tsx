import {Col, Li, Row, Text, Ul, Icon} from "@/components/atoms";
import type {Transaction} from "@/types/transaction.types";
import {formatDate, formatIdr} from "@/utils/formatter.utils";
import type {FC} from "react";
import {Link} from "react-router";

interface TransactionsListProps {
  data: Transaction[];
}

const getAmountPrefix = (transactionTypeId: number): string => {
  if (transactionTypeId === 2) return "- ";
  if (transactionTypeId === 3) return "→ ";
  return "+ ";
};

const getIconStyle = (transactionTypeId: number) => {
  // Expense
  if (transactionTypeId === 2) {
    return "bg-error/10 text-error";
  }

  // Income
  if (transactionTypeId === 1) {
    return "bg-success/10 text-success";
  }

  // Transfer
  return "bg-info/15 text-info";
};

const TransactionsList: FC<TransactionsListProps> = ({data}) => {
  return (
    <Ul className="divide-y divide-base-200">
      {data.map((transaction) => {
        const amountPrefix = getAmountPrefix(transaction.transactionType.id);

        const iconStyle = getIconStyle(transaction.transactionType.id);

        return (
          <Link key={transaction.id} to={`/${transaction.id}`}>
            <Li className="flex gap-3 py-3">
              {/* ICON */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconStyle}`}
              >
                <Icon
                  name={transaction.transactionCategory.iconName || ""}
                  size={16}
                />
              </div>

              {/* MAIN CONTENT */}
              <Row className="flex-1 justify-between gap-3">
                <Col className="items-start gap-1">
                  <Text weight="semibold" className="text-base-content">
                    {transaction.transactionCategory.name}
                  </Text>

                  <Text
                    size="8px"
                    color="base-60"
                    weight="semibold"
                    className="tracking-wider opacity-70"
                  >
                    {formatDate(transaction.createdAt)}
                  </Text>
                </Col>

                {/* AMOUNT */}
                <Col className="items-end gap-1">
                  <Text weight="semibold">
                    {amountPrefix}
                    {formatIdr(transaction.amount)}
                  </Text>

                  {transaction.adminFee > 0 && (
                    <Text size="8px" color="base-60" className="font-medium">
                      +{formatIdr(transaction.adminFee)} fee
                    </Text>
                  )}

                  {transaction.transactionWallets?.length > 0 && (
                    <Row className="gap-1.5 flex-wrap justify-end">
                      {transaction.transactionWallets.map(
                        (walletItem, index) => (
                          <Text
                            key={index}
                            size="8px"
                            color="base-60"
                            className={`px-2 py-0.5 rounded-full border ${
                              walletItem.isIncoming
                                ? "border-success/30 bg-success/5"
                                : "border-error/30 bg-error/5"
                            }`}
                          >
                            {walletItem.isIncoming ? "← " : "→ "}
                            {walletItem.wallet.name}
                          </Text>
                        ),
                      )}
                    </Row>
                  )}
                </Col>
              </Row>
            </Li>
          </Link>
        );
      })}
    </Ul>
  );
};

export default TransactionsList;
