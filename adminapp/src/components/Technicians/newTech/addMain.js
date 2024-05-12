import Sidebar from '../../sidebar/sidebar';
import AddTechnicianForm from './newTechnician';

const  AddMain = () => {       
    return (
        <div className="main-page">
            <Sidebar />
            <AddTechnicianForm />
            

        </div>
    );
}

export default AddMain; 