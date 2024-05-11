import Sidebar from '../sidebar/sidebar';
import RequestList from './RequestList';
import "./MainPage.css";

const  MainPage = () => {       
    return (
        <div className="main-page">
            <Sidebar />
            <RequestList />
        </div>
    );
}

export default MainPage; 