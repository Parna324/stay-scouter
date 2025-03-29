
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HotelsPage from "./pages/HotelsPage";
import HotelDetail from "./pages/HotelDetail";
import DestinationsPage from "./pages/DestinationsPage";
import DealsPage from "./pages/DealsPage";
import AddHotelPage from "./pages/AddHotelPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/deals" element={<DealsPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/add-hotel"
                  element={
                    <ProtectedRoute>
                      <AddHotelPage />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
