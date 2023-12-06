import React, { useState } from "react"
import './startViewComponent.css'
import { TextToSpeechComponent } from "../text.to.speech.component/text.to.speech.component";
import { SpeechToTextComponent } from "../speechToTextComponent/speechToTextComponent";


export const StartViewComponent = () => {
    const [mainComponent, setMainComponent] = useState(true);
    const [textToSpeech, setTextToSpeech] = useState(false);
    const [speechToText, setSpeechToText] = useState(false);

    const handleTextToSpeech = () => {
        setMainComponent(false);
        setTextToSpeech(true);
    }

    const handleSpeechToText = () => {
        setMainComponent(false);
        setSpeechToText(true);
    }

    const handleBackToMain = () => {
        setMainComponent(true);
        setSpeechToText(false);
        setTextToSpeech(false);
    }


    return(
        <div className="start-view-component">
            {mainComponent &&
                <>
                    <div className="welcome-logo">
                        <h1 className="welcome-logo-text">WELCOME</h1>
                        <h2 className="welcome-text">выберите действие</h2>
                    </div>
                    <div className="buttons-form">
                        <div className="welcome-button" onClick={handleTextToSpeech}>Озвучить текст</div>
                        <div className="welcome-button" onClick={handleSpeechToText}>Распознать текст</div>
                    </div>
                </>
            }

            {textToSpeech &&
                <div className="module-component">
                    <div className="go-back-button" onClick={handleBackToMain}>Вернуться на главную страницу</div>
                    <TextToSpeechComponent/>
                </div>
            }


            {speechToText &&
                <>
                    <div className="welcome-button" onClick={handleBackToMain}>Вернуться на главную страницу</div>
                    <SpeechToTextComponent/>
                </>
            }
        </div>
    )
}