
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Explore from "./pages/Explore";
import Discovery from "./pages/Discovery";
import PlaceDetails from "./pages/PlaceDetails";
import NotFound from "./pages/NotFound";
import Recommend from "./pages/Recommend";
import Experiences from "./pages/Experiences";
import Creator from "./pages/Creator";
import AddEditPlace from "./pages/AddEditPlace";
import AddEditGuide from "./pages/AddEditGuide";
import AddEditExperience from "./pages/AddEditExperience";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/recommend/add" element={<AddEditPlace />} />
            <Route path="/recommend/edit/:id" element={<AddEditPlace />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/experiences/add/:placeId?" element={<AddEditExperience />} />
            <Route path="/experiences/edit/:id" element={<AddEditExperience />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/creator/guide/add" element={<AddEditGuide />} />
            <Route path="/creator/guide/edit/:id" element={<AddEditGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
