import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import ContestDetail from "./pages/ContestDetail";
import ContestResults from "./pages/ContestResults";
import TeamBuilder from "./pages/TeamBuilder";
import Leaderboard from "./pages/Leaderboard";
import MyLineups from "./pages/MyLineups";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contest/:id" element={<ContestDetail />} />
            <Route path="/contest/:id/build" element={<TeamBuilder />} />
            <Route path="/contest/:id/results" element={<ContestResults />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/my-lineups" element={<MyLineups />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
