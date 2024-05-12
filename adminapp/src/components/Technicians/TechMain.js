import Sidebar from '../sidebar/sidebar';
import AddTechnicianForm from './newTechnician';

const  MainTech = () => {       
    return (
        <div className="main-page">
            <Sidebar />
            <AddTechnicianForm />
            

        </div>
    );
}

export default MainTech; 