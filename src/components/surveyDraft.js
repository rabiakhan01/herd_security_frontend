const surveyDraft = () => (
    <div>
        <table className="ueTable">
                            <thead>
                                <tr id="tablelabel">
                                    <th>Survey</th>
                                    <th>Sent Via</th>
                                    <th>Users Added</th>
                                    <th></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Phishing Gmail 1</td>
                                    <td>Slack</td>
                                    <td>20</td>
                                    <td>
                                    <button className="editbtn">
                                        <p>Edit</p>
                                        
                                    </button>
                                    <button className="sendbtn">
                                        <p>Send</p>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phishing Gmail 2</td>
                                    <td>Slack</td>
                                    <td>100</td>
                                    <td>
                                    <button className="editbtn">
                                        <p>Edit</p>
                                        
                                    </button>
                                    <button className="sendbtn">
                                        <p>Send</p>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name & profile picture</td>
                                    <td>Engineering</td>
                                    <td>100</td>
                                    <td>
                                    <button className="editbtn">
                                        <p>Edit</p>
                                        
                                    </button>
                                    <button className="sendbtn">
                                        <p>Send</p>
                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
    </div>
);

export default surveyDraft;