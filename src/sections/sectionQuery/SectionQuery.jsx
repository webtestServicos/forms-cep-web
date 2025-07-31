import SidebarComponent from "../../components/sidebar/Sidebar.jsx";
import QueryCustomer from "../../components/queryCustomers/QueryCustomer.jsx";
import './SectionQuery.css';

export default function SectionQuery() {
    return (
        <div className="section-query">
            <SidebarComponent />
            <QueryCustomer />
        </div>
    );
}