import {useState} from "react";
import {format} from "date-fns";
import {formatIdr} from "@/utils/formatter.utils";
import {Button, Col, Grid, Icon, Row, Text} from "@/components/atoms";
import {
  ScreenEmpty,
  ScreenLoader,
  ScreenError,
  ScreenContainer,
} from "@/features/app/components";
import {TransactionList} from "../components";
import {useFetchTransactions} from "../hooks";

const TransactionsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const {data, summary, loading, error, success} =
    useFetchTransactions(formattedDate);

  const changeDay = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === "prev" ? -1 : 1));
    setSelectedDate(newDate);
  };
  const handleDateChange = (value: string) => {
    setSelectedDate(new Date(value));
  };

  const renderContent = () => {
    if (loading) return <ScreenLoader />;
    if (error) return <ScreenError errorMessage={error} />;
    if (success && data.length < 1)
      return <ScreenEmpty entityName="transaction" />;

    return <TransactionList data={data} />;
  };

  return (
    <ScreenContainer
      headerProps={{
        title: "TRANSACTIONS OVERVIEW",
        children: (
          <Row className="flex items-center" gap={2}>
            <Button
              onClick={() => changeDay("prev")}
              className="btn btn-ghost btn-xs p-0 text-base-content/60"
            >
              <Icon name="chevron-left" size={14} />
            </Button>

            <input
              type="date"
              value={format(selectedDate, "yyyy-MM-dd")}
              onChange={(e) => handleDateChange(e.target.value)}
              className="input input-xs input-ghost text-center font-semibold w-1/3"
            />

            <Button
              onClick={() => changeDay("next")}
              className="btn btn-ghost btn-xs p-0 text-base-content/60"
            >
              <Icon name="chevron-right" size={14} />
            </Button>
          </Row>
        ),
      }}
      withAddButton
    >
      <div className="card bg-base-100 card-sm shadow-sm m-4 rounded-lg">
        <div className="card-body">
          <Grid direction="cols" num={3}>
            <Col className="items-center">
              <Text weight="semibold" color="base-60" size="10px">
                Income
              </Text>
              <Text weight="semibold" className="text-base/75">
                + {formatIdr(summary.income)}
              </Text>
            </Col>

            <Col className="items-center">
              <Text weight="semibold" color="base-60" size="10px">
                Expenses
              </Text>
              <Text weight="semibold">- {formatIdr(summary.expense)}</Text>
            </Col>

            <Col className="items-center">
              <Text weight="semibold" color="base-60" size="10px">
                Balance
              </Text>
              <Text
                weight="semibold"
                className={summary.balance >= 0 ? "text-base/75" : "text-error"}
              >
                {summary.balance > 0 ? "+ " : summary.balance < 0 ? "-" : null}
                {formatIdr(Math.abs(summary.balance))}
              </Text>
            </Col>
          </Grid>
        </div>
      </div>

      {renderContent()}
    </ScreenContainer>
  );
};

export default TransactionsPage;
