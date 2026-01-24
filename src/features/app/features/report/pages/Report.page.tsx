import useContextData from "@/store/useContextData";

export default function ReportPage() {
  const {user} = useContextData();
  return (
    <div>
      <h2 className="text-2xl font-semibold">Report Page {user?.name}</h2>
    </div>
  );
}
