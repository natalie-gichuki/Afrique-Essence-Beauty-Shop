import AdminAnalytics from './pages/AdminAnalytics';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Analytics Route */}
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
