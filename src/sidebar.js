import Dashboard from "views/Dashboard/Dashboard.jsx";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PropertyForm from "./views/Forms/PropertyForm";
import SaleDeedForm from "./views/Forms/ProcessForms/SaleDeedForm";
import ManagingOrgForm from "./views/Forms/ManagingOrgForm";
import LeaseForm from "./views/Forms/ProcessForms/LeaseForm";
import TaxForm from "./views/Forms/ProcessForms/TaxForm";
import AllRegistrar from "./views/Tables/AllRegistrar";
import CreateRegistrarForm from "./views/Forms/CreateRegistrarForm";
import PendingDeedTable from "./views/Tables/PendingDeedTable";
import PendingMutationTable from "./views/Tables/PendingMutationTable";
import MutatedPropertiesTable from "./views/Tables/MutatedPropertiesTable";
import OwnProperties from "./views/Tables/OwnProperties";
import SaleDeedUserForm from "./views/Forms/ProcessForms/SaleDeedUserForm";
import SaleDeedOnUserBehalfForm from "./views/Forms/ProcessForms/SaleDeedOnUserBehalfForm";


export const userSideBar = [
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/user"
  },
  {
    path: "/own-properties",
    name: "Own Properties",
    rtlName: "ملف تعريفي للمستخدم",
    mini: "UP",
    rtlMini: "شع",
    component: OwnProperties,
    layout: "/user"
  },
  {
    path: "/sale-deed",
    name: "Sales Deed",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: SaleDeedUserForm,
    layout: "/user"
  },
  {
    path: "/pending-deed",
    name: "Pending Deed Signature",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: PendingDeedTable,
    layout: "/user"
  }
];

export const adminSideBar = [
  {
    path: "/dashboard",
    name: "Managing Org",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/managing-org-add",
    name: "Add Managing Org",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: ManagingOrgForm,
    layout: "/admin"
  },
  {
    path: "/all-registrar",
    name: "All Registrar",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: AllRegistrar,
    layout: "/admin"
  },
  {
    path: "/create-registrar",
    name: "Create Registrar",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: CreateRegistrarForm,
    layout: "/admin"
  }
];

export const registrarSideBar = [
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/registrar"
  },
 
  {
    path: "/property-form",
    name: "Property Form",
    rtlName: "أشكال عادية",
    mini: "PF",
    rtlMini: "صو",
    component: PropertyForm,
    layout: "/registrar"
  },
  {
    path: "/sales-deed",
    name: "Sales deed",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: SaleDeedForm,
    layout: "/registrar"
  },
  {
    path: "/user-sales-deed",
    name: "Sales Deed on User behalf",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: SaleDeedOnUserBehalfForm,
    layout: "/registrar"
  },
  {
    path: "/pending-deed",
    name: "Pending Deed Signature",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: PendingDeedTable,
    layout: "/registrar"
  },
  {
    path: "/pending-mutation",
    name: "Pending Mutations",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: PendingMutationTable,
    layout: "/registrar"
  },
  {
    path: "/mutated-properties",
    name: "Mutated Properties",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: MutatedPropertiesTable,
    layout: "/registrar"
  },
  {
    path: "/lease",
    name: "Lease",
    rtlName: "أشكال عادية",
    mini: "MT",
    rtlMini: "صو",
    component: LeaseForm,
    layout: "/registrar"
  }
  // {
  //   path: "/tax",
  //   name: "Tax",
  //   rtlName: "أشكال عادية",
  //   mini: "TX",
  //   rtlMini: "صو",
  //   component: TaxForm,
  //   layout: "/registrar"
  // }
];
