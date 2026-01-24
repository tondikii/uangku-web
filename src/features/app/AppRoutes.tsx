import type {RouteObject} from "react-router";
import AppLayout from "./components/AppLayout";
import {lazy} from "react";
import {ProtectedRoute} from "@/components/organisms";

const TransactionPage = lazy(
  () => import("./features/transactions/pages/Transactions.page"),
);

const WalletsPage = lazy(() => import("./features/wallets/pages/Wallets.page"));
const CreateWalletPage = lazy(
  () => import("./features/wallets/pages/CreateWallet.page"),
);
const DetailWalletPage = lazy(
  () => import("./features/wallets/pages/DetailWallet.page"),
);

const ReportPage = lazy(() => import("./features/report/pages/Report.page"));

const ProfilePage = lazy(() => import("./features/profile/pages/Profile.page"));

const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TransactionPage />,
      },
      {
        path: "wallets",
        element: <WalletsPage />,
      },
      {
        path: "wallets/create",
        element: <CreateWalletPage />,
      },
      {
        path: "wallets/:id",
        element: <DetailWalletPage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
];

export default appRoutes;
