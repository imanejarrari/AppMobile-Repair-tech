import Sidebar from '';
import AddTechnicianForm from './newTechnician';
const  newTech = () => {       
    return (
        <div className="main-page">
            <Sidebar />
            <AddTechnicianForm />
            

        </div>
    );
}

export default newTech; 