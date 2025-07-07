import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "./pages/Navigation";
import { TasksPage } from "./pages/Tasks";
import "./App.css";
import { ClockPage } from "./pages/Clock";
import { CalendarPage } from "./pages/Calendar";
import { TaskList } from "./components/taskPage/TaskList";
import { TaskForm } from "./components/taskPage/TaskForm";
import { CalendarReminders } from "./components/calendarPage/CalendarReminders";
import { CalendarDisplay } from "./components/calendarPage/CalendarDisplay";
import { UserPage } from "./pages/User";
import { Access } from "./components/authPage/Access";

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

function AppRoutes() {
  const location = useLocation()
  const hideNav = ["/signin", "/signout", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNav && <Navigation />}
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/tasks" element={<TasksPage />}>
          <Route index element={<TaskList />} />
          <Route path="/tasks/create" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Route>
        <Route path="/clock" element={<ClockPage />} />
        <Route path="/calendar" element={<CalendarPage />}>
          <Route index element={<CalendarDisplay />} />
          <Route path="/calendar/reminders" element={<CalendarReminders />} />
        </Route>
        <Route path="/user" element={<UserPage />}>
          <Route index element={<h1>User Profile Details</h1>} />
          <Route path="/user/settings" element={<h1>User Settings</h1>} />
          <Route path="/user/notifications" element={<h1>User Notifications</h1>} />
        </Route>
        <Route path="/signin" element={<Access />} />
        <Route path="/signout" element={<Access />} />
        <Route path="/signup" element={<Access />} />
      </Routes>
    </>
  );
}

export default App;
