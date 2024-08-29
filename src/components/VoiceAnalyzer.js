const VoiceAnalyzer = () => {
    return (
        <div className="voice-analyzer">
            <div className="voice-analyzer-header">
                <p>AI-Generated Audio Detection</p>
            </div>
            <div className="voice-analyzer-main">
                <div className="voice-analyzer-content">
                    <span>Select content type</span>
                    <div className="voice-analyzer-selection">
                        <div className="voice-analyzer-radiobtn">
                            <label>Audio</label>
                            <input type="radio" name="contentType" />
                        </div>
                        <div className="voice-analyzer-radiobtn">
                            <label>Music</label>
                            <input type="radio" name="contentType" />
                        </div>
                    </div>
                </div>
                <div className="voice-analyzer-record">
                    <p>Record audio</p>
                    <button className="btn">Start Recording</button>
                </div>
                <div className="voice-analyzer-record">
                    <p>Choose music file</p>
                    <button className="btn">browse files</button>
                </div>
                <div className="voice-analyzer-upload">
                    <button className="btn">Process Uploaded Audio</button>
                </div>
            </div>
        </div>
    )
}

export default VoiceAnalyzer;