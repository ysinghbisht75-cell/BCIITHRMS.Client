let Login=lazy(()=>import("./Component/loginpage/login.jsx"))
let Signup=lazy(()=>import("./Component/signuppage/signuppage.jsx"));
import {BrowserRouter, Routes, Route} from "react-router-dom";
let Panel=lazy(()=>import("./Component/admin/panel.jsx"))
let Dashboard=lazy(()=>import("./Component/Admin/Dashboard.jsx"))
let Employees=lazy(()=>import("./Component/Admin/Pages/Employees.jsx"))
let Attendance=lazy(()=>import("./Component/Admin/Pages/Attendance.jsx"))
let Payroll=lazy(()=>import("./Component/Admin/Pages/Payroll.jsx"))
let LeaveRequest=lazy(()=>import("./Component/Admin/Pages/LeaveRequest.jsx"))
let Performance=lazy(()=>import("./Component/Admin/Pages/Performance.jsx"))
let Reports=lazy(()=>import("./Component/Admin/Pages/Reports.jsx"))
let Settings=lazy(()=>import("./Component/Admin/Pages/Settings.jsx"))
let RequireAuth=lazy(()=>import("./Component/RequireAuth.jsx"))
import {lazy, Suspense } from "react"

//Employee Route
import EmployeePannel from "./Component/Employee_Panel/EmployeePanel.jsx";
import EmployeeDashboard from "./Component/Employee_Panel/Pages/EmployeeDashboard.jsx";
import EmployeeAttenadnce from "./Component/admin/Pages/Attendance.jsx";
import EmployeeProfile from "./Component/Employee_Panel/Pages/EmployeeProfile.jsx";
import EmployeeRequests from "./Component/Employee_Panel/Pages/EmployeeRequests.jsx";
import EmployeePaySlips from "./Component/Employee_Panel/Pages/EmployeePaySlips.jsx";
import EmployeeSetting from "./Component/Employee_Panel/Pages/EmployeeSetting.jsx";

function App(){

  return(
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signuppage" element={<Signup/>}/>
          <Route path="/admin" element={
            <RequireAuth><Panel/>
            </RequireAuth>}>
          <Route index element={<Dashboard/>}/>
             <Route path="dashboard" element={<Dashboard/>}/>
             <Route path="employees" element={<Employees/>}/>
             <Route path="attendance" element={<Attendance/>}/>
             <Route path="payroll" element={<Payroll/>}/>
             <Route path="leaverequest" element={<LeaveRequest/>}/>
             <Route path="performance" element={<Performance/>}/>
             <Route path="reports" element={<Reports/>}/>
             <Route path="settings" element={<Settings/>}/>
          </Route>
           <Route path="/employee" element={
            <RequireAuth><EmployeePannel/>
            </RequireAuth>}>
          <Route index element={<Dashboard/>}/>
             <Route path="panel" element={<EmployeePannel/>}/>
             <Route path="dashboard" element={<EmployeeDashboard/>}/>
             <Route path="profile" element={<EmployeeProfile/>}/>
             <Route path="payslip" element={<EmployeePaySlips/>}/>
             <Route path="requests" element={<EmployeeRequests/>}/>
             <Route path="settings" element={<EmployeeSetting/>}/>
             <Route path="attendance" element={<EmployeeAttenadnce/>}/>

             
          </Route>

        </Routes>

      </BrowserRouter></Suspense>
    </>
  );
}

export default App;