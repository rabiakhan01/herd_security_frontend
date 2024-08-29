import { useRef, useState } from "react";

const VoiceAnalyzer = () => {

    //states
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null); // Reference to the media stream

    // Handel start recording
    const handleStartRecording = async () => {
        try {
            // Request access to the microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream; // Store the stream reference

            // Create a new MediaRecorder instance
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            // Start recording
            mediaRecorder.start();
            setIsRecording(true);

            // Collect audio data
            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            // Handle the end of the recording
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                audioChunksRef.current = [];
            };
        } catch (err) {
            console.error("Error accessing the microphone:", err);
        }
    };

    // Handel stop recording
    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            // Stop all tracks of the media stream
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null; // Clear the stream reference
            }
        }
    };

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
                    <button className="btn" onClick={isRecording ? handleStopRecording : handleStartRecording}>Start Recording</button>
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