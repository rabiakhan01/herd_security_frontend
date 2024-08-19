import React, { useState } from 'react';
import closeicon from "./assets/x-close.svg";

const SurveySent = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const handleRowClick = (rowData) => {
        setSelectedRowData(rowData);
        setSidebarActive(true);
    };

    const closeSidebar = () => {
        setSidebarActive(false);
    };

    return (
        <div>
            <table className="sentTable">
                <thead>
                    <tr id="tablelabel">
                        <th>Survey</th>
                        <th>Sent Via</th>
                        <th>Users Sent</th>
                        <th>Date Sent</th>
                        <th>Participation</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => handleRowClick({
                        survey: 'Phishing Gmail 1',
                        senvia: 'Slack',
                        usersinvolved: 20,
                        datesent: '05/24/2024',
                        participation: 30,
                        status: 'In Progress'
                    })}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>Phishing Gmail 1</td>
                        <td>Slack</td>
                        <td>20</td>
                        <td>05/24/2024</td>
                        <td>30%</td>
                        <td className="status">In Progress</td>
                    </tr>

                    <tr onClick={() => handleRowClick({
                        survey: 'Phishing Gmail 2',
                        senvia: 'Slack',
                        usersinvolved: 30,
                        datesent: '05/23/2024',
                        participation: 50,
                        status: 'Completed'
                    })}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>Phishing Gmail 2</td>
                        <td>Slack</td>
                        <td>30</td>
                        <td>05/23/2024</td>
                        <td>50%</td>
                        <td className="status">Completed</td>
                    </tr>
                </tbody>
            </table>

            <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                <button className="close-btn" onClick={closeSidebar}>
                    <img src={closeicon} alt="logout button" />
                </button>
                {selectedRowData && (
                    <div className='sidebardetails'>
                        <h2>{selectedRowData.survey}</h2>
                        <h5>Details</h5>
                        <hr></hr>
                        <div className='sentrow'>
                            <p>Participation:</p>
                            <h5>{selectedRowData.participation}%</h5>
                        </div>

                        <div className='sentrow'>
                            <p>Sent Via:</p>
                            <h5>{selectedRowData.senvia}</h5>
                        </div>
                        <div className='sentrow'>
                            <p>Date Sent:</p>
                            <h5>{selectedRowData.datesent}</h5>
                        </div>

                        <div className='sentrow'>
                            <p>Users Involved:</p>
                            <h5>{selectedRowData.usersinvolved}</h5>
                        </div>

                        <table className='addspace'>
                            <thead>
                                <tr>
                                    <th>User Submissions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Olivia Rhye</td>
                                </tr>
                                <tr>
                                    <td>Tommy Oliver</td>
                                </tr>
                                <tr>
                                    <td>Harry Styles</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveySent;
