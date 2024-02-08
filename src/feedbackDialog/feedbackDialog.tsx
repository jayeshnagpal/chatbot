import React, { useState } from 'react';
import './FeedbackDialog.css';

interface FeedbackDialogProps {
    onClose: (isPositive: boolean) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ onClose }) => {
    const [isPositive, setIsPositive] = useState<boolean>(false);

    const handleFeedback = (positive: boolean) => {
        setIsPositive(positive);
    };

    const handleSubmit = () => {
        onClose(isPositive);
    };

    const handleCancel = () => {
        onClose(isPositive);
    };

    return (
        <div className="feedback-dialog">
            <p>Did you find this message helpful?</p>
            <div>
                <button onClick={() => handleFeedback(true)}>👍 Yes</button>
                <button onClick={() => handleFeedback(false)}>👎 No</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default FeedbackDialog;
