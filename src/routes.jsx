import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SectionFormsAddress from './sections/sectionForms/SectionFormsAd.jsx';
import SectionQuery from './sections/sectionQuery/SectionQuery.jsx';
import SectionFormsGun from './sections/sectionFormsGun/SectionFormsGun.jsx';
import SectionQuerySale from './sections/sectionQuerySale/SectionQuerySale.jsx';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/formulario" replace />} />
                <Route path="/formulario" element={<SectionFormsAddress />} />
                <Route path="/consulta" element={<SectionQuery />} />
                <Route path="/consulta-venda" element={<SectionQuerySale />} />
                <Route path="/cadastrarVenda" element={<SectionFormsGun />} />
            </Routes>
        </BrowserRouter>
    );
}