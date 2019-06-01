import Dashboard from "views/Dashboard/Dashboard.jsx";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PropertyForm from "./views/Forms/PropertyForm";
import SaleDeedForm from "./views/Forms/ProcessForms/SaleDeedForm";
import MutationForm from "./views/Forms/ProcessForms/MutationForm";
import LeaseForm from "./views/Forms/ProcessForms/LeaseForm";
import TaxForm from "./views/Forms/ProcessForms/TaxForm";

export const sideBar = [
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  }
];

export const sideBarManager = [
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/property-form",
    name: "Property Form",
    rtlName: "أشكال عادية",
    mini: "PF",
    rtlMini: "صو",
    component: PropertyForm,
    layout: "/admin"
  },
  {
    path: "/sales-deed",
    name: "Sales deed",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: SaleDeedForm,
    layout: "/admin"
  },
  {
    path: "/lease",
    name: "Lease",
    rtlName: "أشكال عادية",
    mini: "MT",
    rtlMini: "صو",
    component: LeaseForm,
    layout: "/admin"
  },
  {
    path: "/tax",
    name: "Tax",
    rtlName: "أشكال عادية",
    mini: "MT",
    rtlMini: "صو",
    component: TaxForm,
    layout: "/admin"
  }
];
