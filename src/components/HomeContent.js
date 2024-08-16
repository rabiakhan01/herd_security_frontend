import activeFinding from './assets/activefindings.svg';
import surveyInProgress from "./assets/surveyInProgress.svg";
import usersEngagedMonth from "./assets/usersEngagedMonth.svg";

const getProgressColor = (value) => {
    if (value <= 0.4) return 'green';
    if (value >= 0.6) return 'red';
    return 'defaultColor';
};

const HomeContent = () => (
            <div>
                <h1>Dashboard</h1>
                    <div id="topboxes">
                        <div className="topcontent">
                            <div className="title">
                                <img src={activeFinding} alt="activeFindings"></img>
                                <h4>Active Findings</h4>
                            </div>
                        </div>
                        <div className="topcontent">
                            <div className="title">
                                <img src={surveyInProgress} alt="surveyInProgress"></img>
                                <h4>Surveys In-Progress</h4>
                            </div>
                        </div>
                        <div className="topcontent">
                            <div className="title">
                                <img src={usersEngagedMonth} alt="users Engaged this month"></img>
                                <h4>Users Engaged This Month</h4>
                            </div>
                        </div>
                        <div className="btmcontent">
                            <h4>Participants</h4>
                        </div>
                        <div className="btmcontent">
                            <h4>Monitored Findings</h4>
                        </div>
                        <div className="btmcontent">
                            <h4>Organization Risk Score</h4>
                        </div>
                    </div>

                    <div id="recent">
                        <h3>Recent Submissions</h3>
                        <table className='findingTable'>
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
                                <tr>
                                    <td>Date & Time</td>
                                    <td>Phishing</td>
                                    <td>Gmail</td>
                                    <td>Sender email</td>
                                    <td>Receiver email</td>
                                    <td>
                                        <div className="scoreBar">
                                            <div className="progress-wrapper">
                                                <div className={`progress-bar ${getProgressColor(0.5)}`} style={{ width: '50%' }}></div>
                                            </div>
                                            <p>3</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date & Time</td>
                                    <td>Phishing</td>
                                    <td>Gmail</td>
                                    <td>Sender email</td>
                                    <td>Receiver email</td>
                                    <td className="bartd">
                                        <div className="scoreBar">
                                            <div className="progress-wrapper">
                                                <div className={`progress-bar ${getProgressColor(1)}`} style={{ width: '100%' }}></div>
                                            </div>
                                            <p>5</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    </div>
);

export default HomeContent;