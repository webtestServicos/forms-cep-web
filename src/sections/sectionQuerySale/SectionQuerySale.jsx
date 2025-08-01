import SidebarComponent from "../../components/sidebar/Sidebar";
import QuerySale from '../../components/querySale/QuerySale.jsx';
import './SectionQuerySale.css';

export default function SectionQuerySale() {
    return (
    <div className="section-query">
        <SidebarComponent />
        <QuerySale />
    </div>
    );
}