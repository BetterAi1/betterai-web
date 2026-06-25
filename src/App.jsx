import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Cookies from "./pages/Cookies";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/aviso-legal" element={<AvisoLegal/>}/>
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad/>}/>
        <Route path="/cookies" element={<Cookies/>}/>
      </Routes>
    </BrowserRouter>
  );
}
