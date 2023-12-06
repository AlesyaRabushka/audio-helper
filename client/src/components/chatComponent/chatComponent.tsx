import React, { useState } from "react";
import "./chatComponent.css"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SendIcon from '@mui/icons-material/Send';
import menu from "../../lists/menuBar";
import SpeechRecognitionExample from "../../helpers/speech-recognition";

export const ChatComponent = () => {
    const [textValue, setTextValue] = useState('')
    const [isMenuBar, setIsMenuBar] = useState(false);


    const showMenuBar = () => {
        setIsMenuBar(!isMenuBar)
    }

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
                <QuestionMarkIcon fontSize="large" className="helper" onClick={showMenuBar}>
                    
                <span className="menu-tooltip">xnjxnjxnxxj</span>
                    </QuestionMarkIcon>
            </div>

            {isMenuBar &&
                <div className="menubar">
                    {menu.map(item => 
                        <div>
                            {item['name']}
                        </div>)}
                </div>
            }


            <SpeechRecognitionExample/>
        </div>
    )
}