import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const Cookies = lazy(() => import("./pages/Cookies"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/aviso-legal" element={<AvisoLegal/>}/>
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad/>}/>
          <Route path="/cookies" element={<Cookies/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
