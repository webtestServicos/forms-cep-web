import Logo from '../../components/logo/Logo.jsx';
import FormularioGoogleSheets from '../../components/forms/formCep.jsx';
import '../../styles/app.css';

export default function SectionFormsAddress() {
    return (
        <div className="section-forms-address">
            <Logo />
            <FormularioGoogleSheets />
        </div>
    );
}