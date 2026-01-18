import useContextData from "@/store/useContextData";

export default function HomePage() {
  const {user} = useContextData();
  return (
    <div>
      <h2 className="text-2xl font-semibold">Home Page {user?.name}</h2>
    </div>
  );
}
