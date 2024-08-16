import React, { useState } from 'react';
import newSurvey from "./assets/newsurvey.svg";
import SurveyDraft from './surveyDraft';
import SurveySend from './surveySent';

const PopupForm = ({ closePopup }) => {
    const [step, setStep] = useState(1);
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''] },
    ]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newQuestions = [...questions];
        if (name.startsWith('option')) {
            const optionIndex = parseInt(name.split('-')[1], 10);
            newQuestions[index].options[optionIndex] = value;
        } else {
            newQuestions[index][name] = value;
        }
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''] }]);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(questions);
        closePopup();
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-btn" onClick={closePopup}>X</button>
                <h3>New Survey</h3>
                <div className="progressbarcontainer">
                    <div className={`circle start ${step >= 2 ? 'completed' : ''}`}>
                        {step >= 2 ? <span className="checkmark">&#x2714;</span> : <div className={`inner-circle ${step >= 2 ? 'inner-circle-completed' : ''}`}></div>}
                    </div>
                    <div className={`line ${step >= 2 ? 'completed' : ''}`}></div>
                    <div className={`circle end ${step >= 2 ? 'completed' : ''}`}>
                        <div className={`inner-circle-end ${step >= 2 ? 'inner-circle-completed' : ''}`}></div>
                    </div>
                </div>
                <div className="alignbar">
                    <p className={step >= 2 ? "colorgreen" : "colorgrey"}><strong>Details and Questions</strong></p>
                    <p className={step >= 2 ? "colorgreen" : "colorgrey"}><strong>Users</strong></p>
                </div>
                <form onSubmit={step === 2 ? handleSubmit : handleNext}>
                    {step === 1 && (
                        <div>
                            <div className='surveycontainer'>
                                <div className='splitcontainer'>
                                    <label htmlFor="title">Survey Title</label>
                                    <input type="text" id="title" name="title" placeholder="Enter Survey Title" required />
                                </div>
                                <div className='splitcontainer'>
                                    <label htmlFor="sendVia">Send Via</label>
                                    <input type="text" id="sendVia" name="sendVia" placeholder="Send Via" required />
                                </div>
                            </div>
                            {questions.map((q, index) => (
                                <div className='popSurveyContainer' key={index}>
                                    <button type="button" className="remove-btn" onClick={() => handleRemoveQuestion(index)}>&#65498;</button>
                                    <div className='surveyborder'>
                                    <div className='questionContainer'>
                                        <label htmlFor="surveyquestion"></label>
                                        <input type="text" name="question" placeholder="Survey question" value={q.question} onChange={(e) => handleChange(index, e)} />
                          
                                    </div>
                                    <div className='surveycontainerbtm'>
                                        <div className='surveycontainerbtm'>
                                            <label htmlFor="option1"></label>
                                            <input type="text" className="option1" name="option1" placeholder="Option 1"  onChange={handleChange} />

                                            <label htmlFor="option2"></label>
                                            <input type="text" className="option2" name="option2" placeholder="Option 2"  onChange={handleChange} />
                                        
                                            <label htmlFor="option3"></label>
                                            <input type="text" className="option3" name="option3" placeholder="Option 3"  onChange={handleChange} />
                                        
                                            <label htmlFor="option4"></label>
                                            <input type="text" className="option4" name="option4" placeholder="Option 4"  onChange={handleChange} />
                                        </div>   
                                    </div>
                               
                                    </div>
                                </div>
                            ))}
                            <button id="addQuestionBtn" type="button" onClick={handleAddQuestion}>Add Question &#65291;</button>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <form id="popupusers"> 
                                <div className='users'>
                                    <input type="checkbox" id="users" name="users" value="users"></input>
                                    <label for="users">Users</label>
                                </div>

                                <div className='bottomborder'>
                                    <input type="checkbox" id="production" name="production" value="production"></input>
                                    <label for="production"> Production</label>
                                </div>

                                <div className='bottomborder'>
                                    <input type="checkbox" id="user1" name="user1" value="user1"></input>
                                    <label for="user1"> User 1</label>
                                </div>

                                <div className='bottomborder'>
                                    <input type="checkbox" id="user2" name="user2" value="user2"></input>
                                    <label for="user2"> User 2</label>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="form-navigation">
                        <button id="nextbtn" type="submit">{step === 2 ? 'Submit' : 'Next'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SurveysContent = () => {
    const [currentView, setCurrentView] = useState('draft');
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'draft':
                return <SurveyDraft />;
            case 'send':
                return <SurveySend />;
            default:
                return <SurveyDraft />;
        }
    };

    return (
        <div>
            <h1>Herd Surveys</h1>
            <form className="search" action="">
                <div className="sorting">
                    <button id="surveybtn" type="button" onClick={togglePopup}>
                        <p>New Survey</p>
                        <img src={newSurvey} alt="invite"></img>
                    </button>
                </div>
                <div className="search-bar">
                    <i className="fa fa-search search-icon"></i>
                    <input type="text" placeholder="Search" name="search"></input>
                </div>
            </form>

            <div id="draftOrSentButtons">
                <button
                    onClick={() => setCurrentView('draft')}
                    className={currentView === 'draft' ? 'active' : ''}
                >
                    Draft
                </button>
                <button
                    onClick={() => setCurrentView('send')}
                    className={currentView === 'send' ? 'active' : ''}
                >
                    Sent
                </button>
            </div>

            <div id="draftOrSent">
                {renderContent()}
            </div>
            {showPopup && <PopupForm closePopup={togglePopup} />}
        </div>
    );
};

export default SurveysContent;
