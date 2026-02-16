import {TRANSACTION_TYPES} from "@/constants/data.constants";
import type {FC} from "react";
import {useFetchTransactionCategories} from "../hooks";
import {Col, Grid, Icon, Text} from "@/components/atoms";
import type {TransactionCategory} from "@/types/transaction.types";

interface TransactionCategoriesProps {
  transactionTypeId: number;
  transactionCategoryId: number;
  handleClickTab: (id: number) => void;
  handleClickCategory: (id: number) => void;
}

interface CategoryProps {
  data: TransactionCategory;
  isSelected?: boolean;
  handleClickCategory: (id: number) => void;
}

// const createCategory = {
//   id: 0,
//   name: "Create New",
//   iconName: "circle-plus",
//   transactionType: {id: 0, name: ""},
// };

const Category: FC<CategoryProps> = ({
  data,
  isSelected,
  handleClickCategory,
}) => {
  return (
    <Col className="items-center" gap={1}>
      <button
        className={`btn btn-lg btn-circle shadow-2xl ${isSelected ? "bg-primary/80" : "bg-primary/30"} border-none`}
        onClick={() => handleClickCategory(data.id)}
      >
        <Icon size={18} name={data.iconName || ""} />
      </button>
      <Text size="10px" className="tracking-wide font-semibold text-center">
        {data.name}
      </Text>
    </Col>
  );
};

const TransactionCategories: FC<TransactionCategoriesProps> = ({
  transactionTypeId,
  transactionCategoryId,
  handleClickTab,
  handleClickCategory,
}) => {
  const {data} = useFetchTransactionCategories();

  return (
    <div className="tabs tabs-box mt-4 bg-primary/30 justify-center m-4 p-4 max-h-2/3">
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
            <div className="tab-content bg-base-100 border-base-300 p-4 h-full">
              <Grid
                direction="cols"
                num={4}
                gap={4}
                center
                className="h-full overflow-auto"
              >
                {transactionCategories.map((e) => {
                  const isSelected = transactionCategoryId === e.id;
                  return (
                    <Category
                      data={e}
                      isSelected={isSelected}
                      handleClickCategory={handleClickCategory}
                    />
                  );
                })}
                {/* <Category
                  data={createCategory}
                  handleClickCategory={handleClickCategory}
                /> */}
              </Grid>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default TransactionCategories;
