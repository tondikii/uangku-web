import {CiMoneyBill, CiUser, CiWallet} from "react-icons/ci";
import {FaChartSimple} from "react-icons/fa6";

export const BOTTOM_NAVIGATION_ITEMS = [
  {name: "Transactions", icon: CiMoneyBill, to: "/", end: true},
  {name: "Wallets", icon: CiWallet, to: "/wallets"},
  {name: "Report", icon: FaChartSimple, to: "/report"},
  {name: "Profile", icon: CiUser, to: "/profile"},
];
