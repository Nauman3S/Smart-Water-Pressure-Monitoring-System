import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AdminDashboardLayout from "@/pages/Layout/AdminDashboardLayout.vue";


import Register from "@/pages/Register.vue";
import Main from "@/pages/Main.vue";
import Dashboard from "@/pages/Dashboard.vue";
import admin_dashboard from "@/pages/admin_dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

const routes = [
  
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/main",
    children: [
      {
        path: "main",
        name: "Main",
        component: Main,
        meta: {
          showSidebar: false,
        },
      },
      {
        path: "register",
        name: "Register",
        component: Register,
        meta: {
          showSidebar: false,
        },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          showSidebar: true,
        },
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
        meta: {
          showSidebar: true,
        },
      },
      {
        path: "table",
        name: "Table List",
        component: TableList,
        meta: {
          showSidebar: true,
        },
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
        
        meta: {
          
          showSidebar: true,
        },
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
        meta: {
          showSidebar: true,
        },
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
          showSidebar: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Control Center",
        component: Notifications,
        meta: {
          showSidebar: true,
        },
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO,
        meta: {
          showSidebar: true,
        },
      }
    ]

    
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardLayout,
    children: [
      {
        path: "admin_dashboard",
        name: "admin_dashboard",
        component: admin_dashboard,
        meta: {
          showSidebar: true,
        },
      },
     
    ]
},
];

export default routes;
