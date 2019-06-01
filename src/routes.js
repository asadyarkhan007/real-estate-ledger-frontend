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

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Property",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/non-user"
  },
  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: Image,
    state: "pageCollapse",
    views: [
      {
        path: "/login-page",
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
        layout: "/admin"
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
        path: "/truffle-page",
        name: "Truffle Page",
        rtlName: "صفحة الخطأ",
        mini: "E",
        rtlMini: "البريد",
        component: TrufflePage,
        layout: "/auth"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "إستمارات",
    icon: "content_paste",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/main-work",
        name: "Computation",
        rtlName: "أشكال عادية",
        mini: "MW",
        rtlMini: "صو",
        component: MainWork,
        layout: "/admin"
      },
      {
        path: "/property-form/:id",
        name: "Property Form",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: PropertyForm,
        layout: "/admin"
      },
      {
        path: "/property-form/:id",
        name: "Property Form",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: PropertyForm,
        layout: "/non-user"
      },
      {
        path: "/property-form",
        name: "Property Form",
        rtlName: "أشكال عادية",
        mini: "RF",
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
        path: "/mutation",
        name: "Mutation",
        rtlName: "أشكال عادية",
        mini: "MT",
        rtlMini: "صو",
        component: MutationForm,
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
      },
      {
        path: "/property-form",
        name: "Property Form",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: PropertyForm,
        layout: "/non-user"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "نماذج موسعة",
        mini: "EF",
        rtlMini: "هوو",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "نماذج التحقق من الصحة",
        mini: "VF",
        rtlMini: "تو",
        component: ValidationForms,
        layout: "/admin"
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "ساحر",
        mini: "W",
        rtlMini: "ث",
        component: Wizard,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "الجداول",
    icon: GridOn,
    state: "tablesCollapse",
    views: [
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Maps",
    rtlName: "خرائط",
    icon: Place,
    state: "mapsCollapse",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "خرائط جوجل",
        mini: "GM",
        rtlMini: "زم",
        component: GoogleMaps,
        layout: "/admin"
      },
      {
        path: "/full-screen-maps",
        name: "Full Screen Map",
        rtlName: "خريطة كاملة الشاشة",
        mini: "FSM",
        rtlMini: "ووم",
        component: FullScreenMap,
        layout: "/admin"
      },
      {
        path: "/vector-maps",
        name: "Vector Map",
        rtlName: "خريطة المتجه",
        mini: "VM",
        rtlMini: "تم",
        component: VectorMap,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "الحاجيات",
    icon: WidgetsIcon,
    component: Widgets,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "الرسوم البيانية",
    icon: Timeline,
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "التقويم",
    icon: DateRange,
    component: Calendar,
    layout: "/admin"
  }
];
export default dashRoutes;
