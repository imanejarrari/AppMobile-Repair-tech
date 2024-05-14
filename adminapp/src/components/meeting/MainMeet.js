import Sidebar from '../sidebar/sidebar';
import MeetingRequestsList from './meetingList';


const  MainMeet = () => {       
    return (
        <div className="main-page">
            <Sidebar />
            <MeetingRequestsList />
            

        </div>
    );
}

export default MainMeet; 