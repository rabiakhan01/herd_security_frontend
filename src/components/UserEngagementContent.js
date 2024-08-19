import inviteUser from "./assets/inviteUser.svg";
import React, { useState } from 'react';
import closeicon from "./assets/x-close.svg";
import expand from './assets/scale.svg';

const getProgressColor = (value) => {
    if (value <= 40) return 'red';
    if (value >= 80) return 'green';
    return 'defaultColor';
};

const PopupForm = ({ closePopup }) => (
    <div className="popup">
        <div className="user-popup-content">
            <button className="close-btn" onClick={closePopup}>X</button>
            <h3>Invite User</h3>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter user's name" required />

                <label htmlFor="useremail">Email</label>
                <input type="email" id="useremail" name="email" placeholder="Enter user's email" required />

                <label htmlFor="team">Team</label>
                <select id="team" name="team">
                    <option value="" disabled selected>Select user's team</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Security">Security</option>
                    <option value="Sales">Sales</option>
                    <option value="Idk">Idk</option>
                </select>

                <button type="submit" id="popupinvite">Invite</button>
            </form>
        </div>
    </div>
);

const UserEngagementContent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [expandActive, setExpandActive] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleRowClick = (rowData) => {
        setSelectedRowData(rowData);
        setSidebarActive(true);
    };

    const closeSidebar = () => {
        setSidebarActive(false);
        setExpandActive(false); // Reset expand state when closing
    };

    const toggleExpandSidebar = () => {
        setExpandActive(!expandActive); // Toggle the expanded state
    };

    return (
        <div>
            <h1>User Engagement</h1>
            <form className="search" action="">
                <div className="sorting">
                    <button type="button" id="invitebtn" onClick={togglePopup}>
                        <p>Invite User</p>
                        <img src={inviteUser} alt="invite"></img>
                    </button>
                </div>
                <div className="search-bar">
                    <i className="fa fa-search search-icon"></i>
                    <input type="text" placeholder="Search" name="search"></input>
                </div>
            </form>

            <table className="ueTable">
                <thead>
                    <tr id="tablelabel">
                        <th>User</th>
                        <th>Team</th>
                        <th>Engagement Score</th>
                        <th>Total Votes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => handleRowClick({
                        name: 'First Last 1',
                        alertType: 'Phishing',
                        team: 'Engineering',
                        engagementScore: 50,
                        totalVotes: 100
                    })}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>Name 1 & profile picture</td>
                        <td>Engineering</td>
                        <td>
                            <div className="scoreBar">
                                <div className="progress-wrapper">
                                    <div className={`progress-bar ${getProgressColor(50)}`} style={{ width: '50%' }}></div>
                                </div>
                                <p>50%</p>
                            </div>
                        </td>
                        <td>100</td>
                    </tr>
                    <tr onClick={() => handleRowClick({
                        name: 'First Last 2',
                        alertType: 'Phishing',
                        team: 'Production',
                        engagementScore: 100,
                        totalVotes: 56
                    })}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>Name 2 and Profile Picture</td>
                        <td>Production</td>
                        <td className="bartd">
                            <div className="scoreBar">
                                <div className="progress-wrapper">
                                    <div className={`progress-bar ${getProgressColor(100)}`} style={{ width: '100%' }}></div>
                                </div>
                                <p>100%</p>
                            </div>
                        </td>
                        <td>56</td>
                    </tr>
                </tbody>
            </table>

            <div className={`sidebar ${sidebarActive ? 'active' : ''} ${expandActive ? 'expanded' : ''}`}>
                {sidebarActive && !expandActive && (
                    <button className="expand-btn" onClick={toggleExpandSidebar}>
                        <img src={expand} alt="expand button" />
                    </button>
                )}
                <button className="close-btn" onClick={closeSidebar}><img src={closeicon} alt="logout button"></img></button>
                {selectedRowData && (
                    <div className="sidebardetails">
                        <h2>User Profile</h2>
                        <div id="flexExpanded">
                            <div className="flexcontainer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" id="sideBarProf" alt="profile img"></img>
                                <div id="namePosi">
                                    <h3>{selectedRowData.name}</h3>
                                    <h4>Position</h4>
                                </div>
                            </div>
                            <div id="engagementScore">
                                <div id="score">
                                    <p>Engagement Score:</p>
                                    <h4 className="biggerFont">{selectedRowData.engagementScore}</h4>
                                </div>
                                {sidebarActive && expandActive && (
                                    <div id="rate">
                                        <p>Engagement Rate:</p>
                                        <h4 className="biggerFont">300 Submissions</h4>
                                    </div>
                                )}
                                <div id="level">
                                    <h4 className="biggerFont">S Gold</h4>
                                </div>
                            </div>
                        </div>
                        <div className="sidebardetails">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Recent Findings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>SO-000021</td>
                                    </tr>
                                    <tr>
                                        <td>SO-000051</td>
                                    </tr>
                                    <tr>
                                        <td>SO-000024</td>
                                    </tr>
                                    <tr>
                                        <td>SO-000060</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {showPopup && <PopupForm closePopup={togglePopup} />}
        </div>
    );
};

export default UserEngagementContent;
