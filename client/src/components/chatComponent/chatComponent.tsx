import React, { useState } from "react";
import "./chatComponent.css"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SendIcon from '@mui/icons-material/Send';

export const ChatComponent = () => {
    const [textValue, setTextValue] = useState('')


    return (
        <div className="chat-component">
            <div className="dialogue-field">

            </div>
            <div className="input-form">
                <input className="input-field" 
                    placeholder="Введите текст здесь..."
                    onChange={e => setTextValue(e.target.value)}
                    value={textValue}
                />
                <div className="menu-button">
                    <SendIcon fontSize="large" className="send-icon"/>
                </div>
                <QuestionMarkIcon fontSize="large" className="helper"/>
            </div>
        </div>
    )
}