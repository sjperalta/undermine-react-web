import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContestProvider } from "@/contexts/ContestContext";
import { ScoringProvider } from "@/contexts/ScoringContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import ContestDetail from "./pages/ContestDetail";
import ContestResults from "./pages/ContestResults";
import TeamBuilder from "./pages/TeamBuilder";
import Leaderboard from "./pages/Leaderboard";
import MyLineups from "./pages/MyLineups";
import AdminDashboard from "./pages/AdminDashboard";
import Matches from "./pages/Matches";
import LeagueTable from "./pages/LeagueTable";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ScoringProvider>
          <ContestProvider>
            <AdminProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/contest/:id" element={<ContestDetail />} />
                  <Route
                    path="/contest/:id/build"
                    element={
                      <ProtectedRoute>
                        <TeamBuilder />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/contest/:id/results" element={<ContestResults />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route
                    path="/my-lineups"
                    element={
                      <ProtectedRoute>
                        <MyLineups />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/league-table" element={<LeagueTable />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AdminProvider>
          </ContestProvider>
        </ScoringProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
