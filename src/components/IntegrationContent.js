import gmaillogo from "./assets/Gmail.svg";
import slacklogo from "./assets/Slack.svg";
import greynoise from "./assets/Greynoise.png";

const IntegrationsContent = () => (
    <div id="inteContent">
        <h1>Integrations</h1>
        <h3>Apps to Monitor</h3>
        <div className="flexcontainer">
            <div className="inteContainer">
                <div className="leftcontent">
                    <img src={gmaillogo} alt="gmail logo"></img>
                    <div className="stack">
                        <h5>Gmail</h5>
                        <p>Monitor Phishing Attacks</p>
                    </div>
                </div>
                <button className="install">Install Plugin</button>
            </div>

            <div className="inteContainer">
                <div className="leftcontent">
                    <img src={slacklogo} alt="slack logo"></img>
                    <div className="stack">
                        <h5>Slack</h5>
                        <p>Set up User Engagement Surveys</p>
                    </div>
                </div>
                <button className="install">Install Plugin</button>
            </div>
        </div>
        <h3>User Engagement Surveys</h3>
        <div className="inteContainer">
            <div className="leftcontent">
                <img src={slacklogo} alt="slack logo"></img>
                <div className="stack">
                    <h5>Slack</h5>
                    <p>Set up User Engagement Surveys</p>
                </div>
            </div>
            <button className="install">Install Plugin</button>
        </div>

        <h3>Threat Feeds</h3>
        <div className="inteContainer">
            <div className="leftcontent">
                <img src={greynoise} alt="greynoise logo"></img>
                <div className="stack">
                    <h5>Greynoise</h5>
                    <p>Greynoise Intelligence</p>
                </div>
            </div>
            <button className="install">Install Plugin</button>
        </div>
    </div>
);

export default IntegrationsContent;
