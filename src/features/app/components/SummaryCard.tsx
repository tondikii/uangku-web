import {Col, Grid, Text} from "@/components/atoms";
import {formatIdr} from "@/utils/formatter.utils";
import type {FC} from "react";
import type {TransactionSummary} from "../features/transactions/types/transaction.types";

interface SummaryCardProps {
  data: TransactionSummary;
}

const SummaryCard: FC<SummaryCardProps> = ({data}) => {
  return (
    <div className="card bg-base-100 card-sm shadow-sm m-4 rounded-lg">
      <div className="card-body">
        <Grid direction="cols" num={3}>
          <Col className="items-center">
            <Text weight="semibold" color="base-60" size="10px">
              Income
            </Text>
            <Text weight="semibold" className="text-base/75">
              + {formatIdr(data.income)}
            </Text>
          </Col>

          <Col className="items-center">
            <Text weight="semibold" color="base-60" size="10px">
              Expenses
            </Text>
            <Text weight="semibold">- {formatIdr(data.expense)}</Text>
          </Col>

          <Col className="items-center">
            <Text weight="semibold" color="base-60" size="10px">
              Balance
            </Text>
            <Text
              weight="semibold"
              className={data.balance >= 0 ? "text-base/75" : "text-error"}
            >
              {data.balance > 0 ? "+ " : data.balance < 0 ? "-" : null}
              {formatIdr(Math.abs(data.balance))}
            </Text>
          </Col>
        </Grid>
      </div>
    </div>
  );
};
export default SummaryCard;
