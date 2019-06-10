import Calendar from "views/Calendar/Calendar.jsx";
import Charts from "views/Charts/Charts.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import ErrorPage from "views/Pages/ErrorPage.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import MainWork from "./views/Misc/MainWork";
import PropertyForm from "views/Forms/PropertyForm.jsx";
import ManagingOrg from "views/Tables/ManagingOrg.jsx";
import UserProfile from "./views/Pages/UserProfile.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Widgets from "views/Widgets/Widgets.jsx";
import Wizard from "views/Forms/Wizard.jsx";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import TrufflePage from "./views/Pages/TrufflePage";
import SaleDeedForm from "./views/Forms/ProcessForms/SaleDeedForm";
import MutationForm from "./views/Forms/ProcessForms/MutationForm";
import LeaseForm from "./views/Forms/ProcessForms/LeaseForm";
import TaxForm from "./views/Forms/ProcessForms/TaxForm";
import ManagingOrgForm from "./views/Forms/ManagingOrgForm";
import AllRegistrar from "./views/Tables/AllRegistrar";
import CreateRegistrarForm from "./views/Forms/CreateRegistrarForm";
import PendingDeedTable from "./views/Tables/PendingDeedTable";
import DeedDetailComponent from "./views/Forms/PropertyForms/DeedDetailComponent";
import PendingMutationTable from "./views/Tables/PendingMutationTable";
import PendingMutationDetail from "./views/Forms/PropertyForms/PendingMutationDetail";
import MutatedPropertiesTable from "./views/Tables/MutatedPropertiesTable";
import MutatedPropertyDetail from "./views/Forms/PropertyForms/MutatedPropertyDetail";
import OwnProperties from "./views/Tables/OwnProperties";
import SaleDeedUserForm from "./views/Forms/ProcessForms/SaleDeedUserForm";
import SaleDeedOnUserBehalfForm from "./views/Forms/ProcessForms/SaleDeedOnUserBehalfForm";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/registrar"
  },
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/visitor"
  },
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/user"
  },
  {
    path: "/dashboard",
    name: "Managing Org",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: ManagingOrg,
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
  },
  {
    path: "/managing-org/:id",
    name: "Organization",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: ManagingOrgForm,
    layout: "/admin"
  },
  {
    path: "/registrar/:id",
    name: "Registrar",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: CreateRegistrarForm,
    layout: "/admin"
  },
  {
    path: "/managing-org-add",
    name: "Managing Organizations",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: ManagingOrgForm,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register Page",
    rtlName: "تسجيل",
    mini: "R",
    rtlMini: "صع",
    component: RegisterPage,
    layout: "/auth"
  },
  {
    path: "/user-page",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    mini: "UP",
    rtlMini: "شع",
    component: UserProfile,
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
    path: "/mutated-property-detail/:id",
    name: "Mutated Property Detail",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: MutatedPropertyDetail,
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
  },
  {
    path: "/deed/:id",
    name: "Pending Deed Signature",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: DeedDetailComponent,
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
    path: "/user-page",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    mini: "UP",
    rtlMini: "شع",
    component: UserProfile,
    layout: "/registrar"
  },
  {
    path: "/user-page",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    mini: "UP",
    rtlMini: "شع",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    mini: "UP",
    rtlMini: "شع",
    component: UserProfile,
    layout: "/user"
  },
  {
    path: "/error-page",
    name: "Error Page",
    rtlName: "صفحة الخطأ",
    mini: "E",
    rtlMini: "البريد",
    component: ErrorPage,
    layout: "/auth"
  },
  {
    path: "/property-form",
    name: "Property Form",
    rtlName: "أشكال عادية",
    mini: "RF",
    rtlMini: "صو",
    component: PropertyForm,
    layout: "/registrar"
  },
  {
    path: "/property/:id",
    name: "Property Form",
    rtlName: "أشكال عادية",
    mini: "RF",
    rtlMini: "صو",
    component: PropertyForm,
    layout: "/registrar"
  },
  {
    path: "/property/:id",
    name: "Property Form",
    rtlName: "أشكال عادية",
    mini: "RF",
    rtlMini: "صو",
    component: PropertyForm,
    layout: "/user"
  },
  {
    path: "/property-form/:id",
    name: "Property Form",
    rtlName: "أشكال عادية",
    mini: "RF",
    rtlMini: "صو",
    component: PropertyForm,
    layout: "/visitor"
  },
  {
    path: "/property-form/:id",
    name: "Property Form",
    rtlName: "أشكال عادية",
    mini: "RF",
    rtlMini: "صو",
    component: PropertyForm,
    layout: "/user"
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
    path: "/pending-deed",
    name: "Pending Deed Signature",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: PendingDeedTable,
    layout: "/registrar"
  },
  {
    path: "/deed/:id",
    name: "Pending Deed Signature",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: DeedDetailComponent,
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
    path: "/mutated-property-detail/:id",
    name: "Mutated Property Detail",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: MutatedPropertyDetail,
    layout: "/registrar"
  },
  {
    path: "/mutation/:id",
    name: "Mutation Detail",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: PendingMutationDetail,
    layout: "/registrar"
  },
  {
    path: "/mutation",
    name: "Mutation",
    rtlName: "أشكال عادية",
    mini: "MT",
    rtlMini: "صو",
    component: MutationForm,
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
  },
  {
    path: "/tax",
    name: "Tax",
    rtlName: "أشكال عادية",
    mini: "MT",
    rtlMini: "صو",
    component: TaxForm,
    layout: "/registrar"
  },
  {
    path: "/user-sales-deed",
    name: "User Sales Deed",
    rtlName: "أشكال عادية",
    mini: "SD",
    rtlMini: "صو",
    component: SaleDeedOnUserBehalfForm,
    layout: "/registrar"
  }
];
export default dashRoutes;
