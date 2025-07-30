import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SectionFormsAddress from './sections/sectionForms/SectionFormsAd.jsx';
import QueryCustomer from './components/queryCustomers.jsx/queryCustomer.jsx';
import SectionFormsGun from './sections/sectionFormsGun/SectionFormsGun.jsx';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/formulario" replace />} />
                <Route path="/formulario" element={<SectionFormsAddress />} />
                <Route path="/consulta" element={<QueryCustomer />} />
                <Route path="/cadastrarVenda" element={<SectionFormsGun />} />
            </Routes>
        </BrowserRouter>
    );
}