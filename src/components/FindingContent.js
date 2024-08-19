import React, { useState } from 'react';
import filter from "./assets/filter-funnel.svg";
import calendar from "./assets/calendar.svg";
import closeicon from "./assets/x-close.svg";
import expand from './assets/scale.svg';

const getProgressColor = (value) => {
    if (value < 0.4) return 'green';
    if (value > 0.6) return 'red';
    return 'defaultColor';
};

const FindingsContent = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [expandActive, setExpandActive] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

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
        <div id="findings">
            <h1>Findings</h1>
            <form className="search" action="">
                <div className="sorting">
                    <button type="button">
                        <p>Date Range</p>
                        <img src={calendar} alt="calendar" />
                    </button>
                    <button type="button">
                        <p>String</p>
                        <img src={filter} alt="filter" />
                    </button>
                    <button type="button">
                        <p>Receiver</p>
                        <img src={filter} alt="filter" />
                    </button>
                    <button type="button">
                        <p>Sender</p>
                        <img src={filter} alt="filter" />
                    </button>
                </div>
                <div className="search-bar">
                    <i className="fa fa-search search-icon"></i>
                    <input type="text" placeholder="Search" name="search" />
                </div>
            </form>
            <table className="findingTable">
                <thead>
                    <tr id="tablelabel">
                        <th>Date & Time</th>
                        <th>Alert Type</th>
                        <th>Application</th>
                        <th>Sender Email</th>
                        <th>Receiver Email</th>
                        <th>Risk Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => handleRowClick({
                        dateTime: 'Date & Time',
                        alertType: 'Phishing',
                        application: 'Gmail',
                        senderEmail: 'Sender email',
                        receiverEmail: 'Receiver email',
                        riskScore: 3
                    })}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>Date & Time</td>
                        <td>Phishing</td>
                        <td>Gmail</td>
                        <td>Sender email</td>
                        <td>Receiver email</td>
                        <td>
                            <div className="scoreBar">
                                <div className="progress-wrapper">
                                    <div className={`progress-bar ${getProgressColor(3 / 5)}`} style={{ width: '50%' }}></div>
                                </div>
                                <p>3</p>
                            </div>
                        </td>
                    </tr>
                    <tr onClick={() => handleRowClick({
                        dateTime: 'Date & Time',
                        alertType: 'Phishing',
                        application: 'Gmail',
                        senderEmail: 'Sender email',
                        receiverEmail: 'Receiver email',
                        riskScore: 5
                    })}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>Date & Time</td>
                        <td>Phishing</td>
                        <td>Gmail</td>
                        <td>Sender email</td>
                        <td>Receiver email</td>
                        <td className="bartd">
                            <div className="scoreBar">
                                <div className="progress-wrapper">
                                    <div className={`progress-bar ${getProgressColor(5 / 5)}`} style={{ width: '100%' }}></div>
                                </div>
                                <p>5</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className={`sidebar ${sidebarActive ? 'active' : ''} ${expandActive ? 'expanded' : ''}`}>
                {/* Conditionally render the expand button if the sidebar is active and not expanded */}
                {sidebarActive && !expandActive && (
                    <button className="expand-btn" onClick={toggleExpandSidebar}>
                        <img src={expand} alt="expand button" />
                    </button>
                )}
                <button className="close-btn" onClick={closeSidebar}>
                    <img src={closeicon} alt="close button" />
                </button>
                {selectedRowData && (
                    <div className='sidebardetails'>
                        <h2>{selectedRowData.alertType}</h2>
                        <p>Risk Score <span className={`editbackground ${getProgressColor(selectedRowData.riskScore / 5)}`}>
                            {selectedRowData.riskScore}</span></p>
                        <div className='flexcontainer'>
                            <div className='sidebarinfo'>
                                <p>Sender email</p>
                                <p><strong>{selectedRowData.senderEmail}</strong></p>
                            </div>
                            <div className='sidebarinfo'>
                                <p>Receiver email</p>
                                <p><strong>{selectedRowData.receiverEmail}</strong></p>
                            </div>
                            <div className='sidebarinfo'>
                                <p>Received date and time</p>
                                <p><strong>{selectedRowData.dateTime}</strong></p>
                            </div>
                            <div className='sidebarinfo'>
                                <p>Submitted date and time</p>
                                <p><strong>{"{Submitted Date}"}</strong></p>
                            </div>
                        </div>
                        <div className="sidebarContainer">
                            <p>Email Body</p>
                            <p><strong>{"{Email Body}"}</strong></p>
                        </div>
                        <div className="sidebarContainer">
                            <p>Comments</p>
                            <p><strong>{"{Comments}"}</strong></p>
                        </div>
                        <div id="classbarComment">
                            <label htmlFor="comment"></label>
                            <input type="text" id="comment" name="comment" placeholder="Add comments..." />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindingsContent;
