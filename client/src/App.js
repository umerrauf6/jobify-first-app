import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute.js";
import {
  Register,
  Error,
  Landing,
  DashBoard,
  ResetPassword,
} from "./pages/index.js";
import {
  AddJobs,
  AllJobs,
  SharedLayout,
  Profile,
  Stats,
} from "./pages/pages/index.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<DashBoard />} />
            <Route path="stats" element={<Stats />} />
            <Route path="/add-jobs" element={<AddJobs />} />
            <Route path="/all-jobs" element={<AllJobs />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route
            path="/reset-password/:token/:id"
            element={<ResetPassword />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
