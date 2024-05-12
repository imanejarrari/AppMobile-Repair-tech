import Sidebar from '../../sidebar/sidebar';
import AddTechnicianForm from './newTechnician';

const  addMain = () => {       
    return (
        <div className="main-page">
            <Sidebar />
            <AddTechnicianForm />
            

        </div>
    );
}

export default addMain; 