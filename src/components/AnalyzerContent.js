import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const AnalyzerContext = createContext();
const PopupForm = ({ closePopup, setShowPopup, setEmailAnalysis, emailAnalysis, setAnalysisLoading }) => {

    const endPoint = {
        getEmail: 'https://mailapi.testerp.co/fetch_emails',
        analyze: 'https://mailapi.testerp.co/analyze_email'
    }
    const [isLoading, setIsLoading] = useState(false)
    const { formData, setFormData, emailDetails, setEmailDetails } = useContext(AnalyzerContext);
    const [isEmpty, setIsEmpty] = useState({
        email: '',
        password: ''
    })
    const [question, setQuestion] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isError, setIsError] = useState(false);
    const [inputDisable, setInputDisable] = useState(true);

    //handel the onChange behvaiour of form
    const handelOnChange = (event) => {
        setIsError(false)
        setFormData(() => ({
            ...formData,
            [event.target.name]: event.target.value
        }))
        setIsEmpty(() => {
            let empty = { ...isEmpty }
            if (empty.email && event.target.name === 'email') {
                empty = {
                    ...empty,
                    email: false,
                }
            }
            if (empty.password && event.target.name === 'password') {
                empty = {
                    ...empty,
                    password: false
                }
            }
            if (empty.isEmailNotValid) {
                empty = {
                    ...empty,
                    isEmailNotValid: false
                }
            }
            return empty;
        })
    }

    //check if email is valid or not
    const isValidEmail = (email) => {
        const text = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return text.test(email);
    }

    //check if any field is empty on click
    const isEmptyDetails = () => {
        let empty;
        if (formData.email === '' || formData.password === null) {
            empty = {
                ...empty,
                email: true,
            }
        }
        if (formData.password === '' || formData.password === null) {
            empty = {
                ...empty,
                password: true,
            }
        }
        if (!isValidEmail(formData.email)) {
            empty = {
                ...empty,
                isEmailNotValid: true
            }
        }
        if (empty) {
            setIsEmpty(empty)
            return true
        }
        else return false;
    }

    //fetch all emails 
    const fetchAllEmail = () => {

        const payload = {
            email_address: formData.email,
            password: formData.password
        }
        setIsLoading(true);
        axios.post(endPoint.getEmail, payload).then((response) => {
            if (response) {
                const data = response?.data?.map((item, index) => {
                    return (
                        {
                            id: index + 1,
                            email: item.sender.split(/[<,>]+/).join(''),
                            checked: false,
                            subject: item.subject,
                            body: item.body,
                        }
                    )
                });
                if (data?.length > 0) {
                    setIsLoading(false)
                    setEmailDetails(data);
                }
                else {
                    setIsLoading(false)
                    setEmailDetails([])
                    setIsError(true)
                }
            }
        }).catch((error) => {
            setIsLoading(false)
            console.log("🚀 ~ getEmail ~ error:", error)
        })

    }

    // handel the get email onclick
    const handelGetEmails = () => {
        if (!isEmptyDetails()) {
            fetchAllEmail();
        }
        else {
            console.log('error')
        }
    }

    //handel the on change of checkboxes
    const handelAnalysisOnChange = (index) => {
        const newDetail = emailDetails?.map((item) => {
            if (item.id === index + 1) {
                return { ...item, checked: !item.checked }
            }
            else return item
        })
        setEmailDetails(newDetail)
        const isChecked = newDetail.some((item) => item.checked);
        if (isChecked) {
            setInputDisable(false);
        }
        else {
            setInputDisable(true)
        }
        // console.log("🚀 ~ handelAnalysisOnChange ~ isDisable:", isDisable)
    }

    //fetch the analysis for the selected email
    const fetchAnalysisDetails = () => {
        let emailDetail;
        emailDetails?.filter((item) => {
            if (item.checked) {
                emailDetail = {
                    email_address: item.email,
                    email_content: item.body
                }
            }
        })
        // console.log("🚀 ~ emailDetail ~ emailDetail:", emailDetail)
        const payload = {
            email_content: emailDetail.email_content,
            email_address: emailDetail.email_address,
            query: question,
        }
        // console.log("🚀 ~ fetchAnalysisDetails ~ payload:", payload)
        try {
            axios.post(endPoint.analyze, payload).then((response) => {
                if (response) {
                    setAnalysisLoading(false)
                    setIsLoading(false)
                    setEmailAnalysis([{ ...response?.data }])
                }
            })
        } catch (error) {
            console.log("🚀 ~ getEmail ~ error:", error)

        }
    }

    //handel the onclick of analyze
    const handelEmailAnalysis = () => {
        setShowPopup(false);
        setAnalysisLoading(true)
        setEmailAnalysis([]);
        fetchAnalysisDetails();
    }

    return (
        <div className="popup">
            <div className="popup-content">
                <div>
                    <div className='popup-heading'>
                        <span>Security Assistant</span>
                        <button onClick={closePopup}>X</button>
                    </div>
                    <form className='popup-form'>

                        <div className='popup-input'>
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                className='input-field'
                                name="email"
                                value={formData.email}
                                placeholder='Enter email'
                                onChange={handelOnChange}
                                style={
                                    {
                                        borderColor: isEmpty?.email ? '#D92D20' : isEmpty?.isEmailNotValid ? '#D92D20' : ''
                                    }
                                } />
                            <span>{isEmpty?.email ? 'email is required' : isEmpty?.isEmailNotValid ? 'email not valid' : ''}</span>
                        </div>
                        <div className='popup-input'>
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                className='input-field'
                                id="password"
                                name="password"
                                value={formData.password}
                                placeholder="Enter password"
                                onChange={handelOnChange}
                                style={
                                    {
                                        borderColor: isEmpty?.password ? '#D92D20' : ''
                                    }
                                }
                            />
                            <span>{isEmpty?.password ? 'password is required' : ''}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {
                                isError ?
                                    <span style={{ color: '#D92D20' }}>
                                        Email or Password is not valid
                                    </span>
                                    :
                                    <span></span>
                            }
                            <button type="button" id="analyzebtn" onClick={handelGetEmails}>Get Emails</button>
                        </div>
                    </form>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: isLoading ? '' : 'hidden'
                }}>
                    {
                        isLoading ?
                            <div className='loading'>
                                <span class="loader"></span>
                            </div>
                            :
                            emailDetails?.length > 0 ?
                                <div className='detail'>
                                    <span>Email Details</span>
                                    <div className='detail-content'>
                                        {
                                            emailDetails?.map((item, index) => {
                                                return (
                                                    <div key={index} className='detail-item'>
                                                        <input type='checkbox' style={{ cursor: 'pointer' }} name={item.email} checked={item.checked} onChange={() => { handelAnalysisOnChange(index) }} />
                                                        <div className='email'>
                                                            <div>
                                                                <span className='email-heading'>Email from: </span>
                                                                <span>{item.email}</span>
                                                            </div>
                                                            <div>
                                                                <span className='email-heading'>Subject: </span>
                                                                <span> {item.subject}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='detail-question'>
                                        <label>Ask a question about the selected emails:</label>
                                        <input
                                            className='input-field'
                                            name='question'
                                            value={question}
                                            disabled={inputDisable}
                                            onChange={(event) => {
                                                setQuestion(event.target.value)
                                                if (event.target.value?.length > 0) {
                                                    setIsDisable(false)

                                                }
                                                else {
                                                    setIsDisable(true);

                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="detail-button">
                                        <button disabled={isDisable} onClick={handelEmailAnalysis}>Analyze</button>
                                    </div>
                                </div>
                                :
                                ''
                    }
                </div>
            </div>
        </div>
    )
};

const DetailModal = ({ closePopup, assistant_response }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <div>
                    <div className='popup-heading'>
                        <span>Analysis Result</span>
                        <button onClick={closePopup}>X</button>
                    </div>
                    <div>{assistant_response}</div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
};

const AnalyzerContent = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [emailDetails, setEmailDetails] = useState();
    const value = { formData, setFormData, emailDetails, setEmailDetails }
    const [showPopup, setShowPopup] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [emailAnalysis, setEmailAnalysis] = useState([]);
    const [analysisLoading, setAnalysisLoading] = useState(false);

    const handleEmailClick = () => {
        setShowPopup(true);
    };

    const togglePopup = () => {
        setShowPopup(false);
        setShowDetailModal(false)

    };

    return (
        <AnalyzerContext.Provider value={value}>
            <div className='flex flex-col h-20 w-20 bg-lime-400'></div>
            <div className='analyzer'>
                <div className='analyzer-header' style={{ flexWrap: 'wrap' }}>
                    <h1>Email Security Analyzer and Assistant</h1>
                    <div className='header-btn'>
                        <a id='create-app-btn' target='_blank' href='https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4PxfYKdZv4d9HZYSc8lJPTlCQQRLb[…]Dx51YhA4qrSqJ4od63FSbG6ZXAUmItopBlK9J-e4jSMi9wfwcYFh4PDH4c'>Create App Password</a>
                        <button id="add-analyzer-btn" onClick={() => handleEmailClick()}>Add Analyzer</button>
                    </div>

                </div>
                <div id="analysis-result">
                    {
                        emailAnalysis?.length ?
                            <div className="emailContainer">
                                <div className="makeRow">
                                    <h4>Confidence:</h4>
                                    <p>{emailAnalysis[0]?.analysis_result?.confidence}</p>
                                </div>
                                <div className="makeRow">
                                    <h4>Threat:</h4>
                                    <p>{emailAnalysis[0]?.analysis_result?.is_threat ? "Threat is found" : "No threat is found"}</p>
                                </div>
                                <div className="makeRow">
                                    <h5>Reason: </h5>
                                    <p>{emailAnalysis[0]?.analysis_result?.reason}</p>
                                </div>
                                <div className="makeRow">
                                    <h5>Response: </h5>
                                    <p>{emailAnalysis[0]?.assistant_response ? emailAnalysis[0]?.assistant_response : 'No Response Found'}</p>
                                </div>
                            </div>
                            :
                            analysisLoading
                                ?
                                <div className='main-loading'>
                                    <span class="loader"></span>
                                </div>
                                :
                                ''
                    }
                </div>
                {showDetailModal && <DetailModal closePopup={togglePopup} assistant_response={emailAnalysis[0]?.assistant_response} />}
                {showPopup && <PopupForm closePopup={togglePopup} setShowPopup={setShowPopup} setEmailAnalysis={setEmailAnalysis} emailAnalysis={emailAnalysis} setAnalysisLoading={setAnalysisLoading} />}
            </div>
        </AnalyzerContext.Provider>
    );
};

export default AnalyzerContent;
