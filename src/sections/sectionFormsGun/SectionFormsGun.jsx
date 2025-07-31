import SidebarComponent from "../../components/sidebar/Sidebar.jsx";
import FormsSale from '../../components/formsVenda/FormsSale.jsx';
import './SectionFormsGun.css';

export default function SectionFormsGun() {
    return (
        <div className="section-forms-gun">
            <SidebarComponent />
            <FormsSale />
        </div>    
    );
}