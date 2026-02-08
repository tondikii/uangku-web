import {TRANSACTION_TYPES} from "@/constants/data.constants";
import type {FC} from "react";
import {useFetchTransactionCategories} from "../hooks";
import {Col, Grid, Icon, Text} from "@/components/atoms";

interface TransactionCategoriesProps {
  transactionTypeId: number;
  transactionCategoryId: number;
  handleClickTab: (id: number) => void;
  handleClickCategory: (id: number) => void;
}

const TransactionCategories: FC<TransactionCategoriesProps> = ({
  transactionTypeId,
  transactionCategoryId,
  handleClickTab,
  handleClickCategory,
}) => {
  const {data} = useFetchTransactionCategories();

  return (
    <div className="tabs tabs-box mt-4 bg-primary/30 justify-center m-4 p-4">
      {TRANSACTION_TYPES.map((type) => {
        const transactionCategories = data.filter(
          (e) => e.transactionType.id === type.id,
        );
        const isChecked = transactionTypeId === type.id;

        return (
          <>
            <input
              type="radio"
              name="transactionType"
              className={`tab tracking-wide font-semibold text-xs ${isChecked ? "text-base-content/80 !bg-primary/80" : "text-base-content/60"}`}
              aria-label={type.name}
              checked={isChecked}
              onClick={() => handleClickTab(type.id)}
            />
            <div className="tab-content bg-base-100 border-base-300 p-4">
              <Grid direction="cols" num={4} className="place-items-center">
                {transactionCategories.map((e) => {
                  const isSelected = transactionCategoryId === e.id;
                  return (
                    <Col className="items-center" gap={1}>
                      <button
                        className={`btn btn-lg btn-circle shadow-2xl ${isSelected ? "bg-primary/80" : "bg-primary/30"} border-none`}
                        onClick={() => handleClickCategory(e.id)}
                      >
                        <Icon size={18} name={e.iconName || ""} />
                      </button>
                      <Text size="10px" className="tracking-wide font-semibold">
                        {e.name}
                      </Text>
                    </Col>
                  );
                })}
              </Grid>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default TransactionCategories;
