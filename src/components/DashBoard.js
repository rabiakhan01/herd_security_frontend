import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './DashBoard.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from './imgs/logo.png';
import integrations from "./assets/Integrations.svg";
import userEngagement from "./assets/userEngagement.svg";
import survey from "./assets/survey.svg";
import logoutlogo from "./assets/logout.svg";
import analyzer from "./assets/emailAnalyzer.svg"

import HomeContent from './HomeContent';
import FindingsContent from './FindingContent';
import IntegrationsContent from './IntegrationContent';
import UserEngagementContent from './UserEngagementContent';
import SurveysContent from './SurveyContent';
import AnalyzerContent from './AnalyzerContent';


const App = () => (
    <div>
      {/* Logo is an actual React component */}
      <home fill='none' stroke='green'/>
    </div>
  );

const DashBoard = () => {
    const { logout, user, isAuthenticated } = useAuth0();
    const [activeComponent, setActiveComponent] = useState('home');
    const [activeOption, setActiveOption] = useState('home');

    const getProgressColor = (value) => {
        if (value <= 0.4) return 'green';
        if (value >= 0.6) return 'red';
        return 'defaultColor';
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'home':
                return <HomeContent />;
            case 'findings':
                return <FindingsContent />;
            case 'integrations':
                return <IntegrationsContent />;
            case 'userEngagement':
                return <UserEngagementContent />;
            case 'surveys':
                return <SurveysContent />;
            case 'analyzer':
                return <AnalyzerContent />;
            default:
                return <HomeContent />;
        }
    };

    const handleOptionClick = (option) => {
        setActiveComponent(option);
        setActiveOption(option);
    };

    return (
        isAuthenticated && (
            <div id="whole">
                <div id="dashboard">
                    <div id="dash">
                        <img src={logo} alt="logo" id='logo'></img>
                        <button 
                            className={`options ${activeOption === 'home' ? 'active' : ''}`} 
                            onClick={() => handleOptionClick('home')}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 17H16M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className="pdash">Home</p>
                        </button>
                        
                        <button 
                            className={`options ${activeOption === 'findings' ? 'active' : ''}`} 
                            onClick={() => handleOptionClick('findings')}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className="pdash">Findings</p>
                        </button>
                        <button 
                            className={`options ${activeOption === 'integrations' ? 'active' : ''}`} 
                            onClick={() => handleOptionClick('integrations')}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.2 22C21.48 22 21.62 22 21.727 21.9455C21.8211 21.8976 21.8976 21.8211 21.9455 21.727C22 21.62 22 21.48 22 21.2V10.8C22 10.52 22 10.38 21.9455 10.273C21.8976 10.1789 21.8211 10.1024 21.727 10.0545C21.62 10 21.48 10 21.2 10L18.8 10C18.52 10 18.38 10 18.273 10.0545C18.1789 10.1024 18.1024 10.1789 18.0545 10.273C18 10.38 18 10.52 18 10.8V13.2C18 13.48 18 13.62 17.9455 13.727C17.8976 13.8211 17.8211 13.8976 17.727 13.9455C17.62 14 17.48 14 17.2 14H14.8C14.52 14 14.38 14 14.273 14.0545C14.1789 14.1024 14.1024 14.1789 14.0545 14.273C14 14.38 14 14.52 14 14.8V17.2C14 17.48 14 17.62 13.9455 17.727C13.8976 17.8211 13.8211 17.8976 13.727 17.9455C13.62 18 13.48 18 13.2 18H10.8C10.52 18 10.38 18 10.273 18.0545C10.1789 18.1024 10.1024 18.1789 10.0545 18.273C10 18.38 10 18.52 10 18.8V21.2C10 21.48 10 21.62 10.0545 21.727C10.1024 21.8211 10.1789 21.8976 10.273 21.9455C10.38 22 10.52 22 10.8 22L21.2 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 6.8C10 6.51997 10 6.37996 10.0545 6.273C10.1024 6.17892 10.1789 6.10243 10.273 6.0545C10.38 6 10.52 6 10.8 6H13.2C13.48 6 13.62 6 13.727 6.0545C13.8211 6.10243 13.8976 6.17892 13.9455 6.273C14 6.37996 14 6.51997 14 6.8V9.2C14 9.48003 14 9.62004 13.9455 9.727C13.8976 9.82108 13.8211 9.89757 13.727 9.9455C13.62 10 13.48 10 13.2 10H10.8C10.52 10 10.38 10 10.273 9.9455C10.1789 9.89757 10.1024 9.82108 10.0545 9.727C10 9.62004 10 9.48003 10 9.2V6.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 12.8C3 12.52 3 12.38 3.0545 12.273C3.10243 12.1789 3.17892 12.1024 3.273 12.0545C3.37996 12 3.51997 12 3.8 12H6.2C6.48003 12 6.62004 12 6.727 12.0545C6.82108 12.1024 6.89757 12.1789 6.9455 12.273C7 12.38 7 12.52 7 12.8V15.2C7 15.48 7 15.62 6.9455 15.727C6.89757 15.8211 6.82108 15.8976 6.727 15.9455C6.62004 16 6.48003 16 6.2 16H3.8C3.51997 16 3.37996 16 3.273 15.9455C3.17892 15.8976 3.10243 15.8211 3.0545 15.727C3 15.62 3 15.48 3 15.2V12.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 2.8C2 2.51997 2 2.37996 2.0545 2.273C2.10243 2.17892 2.17892 2.10243 2.273 2.0545C2.37996 2 2.51997 2 2.8 2H5.2C5.48003 2 5.62004 2 5.727 2.0545C5.82108 2.10243 5.89757 2.17892 5.9455 2.273C6 2.37996 6 2.51997 6 2.8V5.2C6 5.48003 6 5.62004 5.9455 5.727C5.89757 5.82108 5.82108 5.89757 5.727 5.9455C5.62004 6 5.48003 6 5.2 6H2.8C2.51997 6 2.37996 6 2.273 5.9455C2.17892 5.89757 2.10243 5.82108 2.0545 5.727C2 5.62004 2 5.48003 2 5.2V2.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className="pdash">Integrations</p>
                        </button>
                        <button 
                            className={`options ${activeOption === 'userEngagement' ? 'active' : ''}`} 
                            onClick={() => handleOptionClick('userEngagement')}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className="pdash">User Engagement</p>
                        </button>
                        <button 
                            className={`options ${activeOption === 'surveys' ? 'active' : ''}`} 
                            onClick={() => handleOptionClick('surveys')}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 4C16.93 4 17.395 4 17.7765 4.10222C18.8117 4.37962 19.6204 5.18827 19.8978 6.22354C20 6.60504 20 7.07003 20 8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V8C4 7.07003 4 6.60504 4.10222 6.22354C4.37962 5.18827 5.18827 4.37962 6.22354 4.10222C6.60504 4 7.07003 4 8 4M9 15L11 17L15.5 12.5M9.6 6H14.4C14.9601 6 15.2401 6 15.454 5.89101C15.6422 5.79513 15.7951 5.64215 15.891 5.45399C16 5.24008 16 4.96005 16 4.4V3.6C16 3.03995 16 2.75992 15.891 2.54601C15.7951 2.35785 15.6422 2.20487 15.454 2.10899C15.2401 2 14.9601 2 14.4 2H9.6C9.03995 2 8.75992 2 8.54601 2.10899C8.35785 2.20487 8.20487 2.35785 8.10899 2.54601C8 2.75992 8 3.03995 8 3.6V4.4C8 4.96005 8 5.24008 8.10899 5.45399C8.20487 5.64215 8.35785 5.79513 8.54601 5.89101C8.75992 6 9.03995 6 9.6 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className="pdash">Herd Surveys</p>
                        </button>
                        <button 
                            className={`options ${activeOption === 'analyzer' ? 'active' : ''}`} 
                            onClick={() => handleOptionClick('analyzer')}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.91822 3.38565C8.40742 2.50524 10.1447 2 12 2C17.5228 2 22 6.47715 22 12C22 12.0331 21.9998 12.0662 21.9995 12.0993M3.38114 6.92585C2.50352 8.41335 2 10.1479 2 12C2 16.6596 5.18693 20.5748 9.5 21.685M20.7076 16.9206C19.3872 19.2522 17.1574 21.001 14.5 21.685M14.0893 6.37378C13.4387 6.13207 12.7348 6 12 6C8.68629 6 6 8.68629 6 12C6 12.7387 6.13351 13.4463 6.37772 14.0999M17.6251 9.90767C17.8675 10.5591 18 11.2641 18 12C18 15.3137 15.3137 18 12 18C11.2701 18 10.5707 17.8697 9.92373 17.631M12 10V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className="pdash">Email Analyzer</p>
                        </button>
                    </div>
                    <div className="center">
                        <img id="profimg" src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="profile img"></img>
                        <div id="userinfo">
                            <p className='editp'>name </p>
                            <p className='editemail'>{user?.email}</p>
                        </div>
                        <button id="logoutbtn" onClick={() => logout()}>
                            <img src={logoutlogo} alt="logout"></img>
                        </button>
                    </div>
                </div>

                <div id="content">
                    {renderContent()}
                </div>
            </div>
        )
    );
};

export default DashBoard;
