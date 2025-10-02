import {Outlet, Link} from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 shadow flex justify-between">
        <h1 className="text-xl font-bold">UangKu</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
