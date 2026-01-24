import useContextData from "@/store/useContextData";

export default function TransactionsPage() {
  const {user} = useContextData();
  return (
    <div>
      <h2 className="text-2xl font-semibold">Transactions Page {user?.name}</h2>
    </div>
  );
}
