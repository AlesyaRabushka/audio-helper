import React, { useEffect, useState } from "react"
import './text.to.speech.component.css'
import { DropDownComponent } from "../DropDown/dropDownComponent";
import { ScaleLoader } from "react-spinners";

export const TextToSpeechComponent = () => {
    // text to speech recognition
    const [text, setText] = useState('');
    const [lang, setLang] = useState('en-US');
    const [voice, setVoice] = useState('English (America)+Michael');

    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const allVoices = speechSynthesis.getVoices();
    console.log(allVoices)
    const [currentVoice, setCurrentVoice] = useState(allVoices[0]);


    const [voices, setVoices] = useState(Array<string>);
    const [ruVoices, setRuVoices] = useState(Array<any>);
    const [enVoices, setEnVoices] = useState(Array<any>);

    const [speaking, setSpeaking] = useState(false);


    
    
    

    useEffect(() => {
        let voicesArray = new Array<string>;
        let voicesEnArray = new Array<any>;
        let voicesRuArray = new Array<any>;

        for (let i = 0; i < allVoices.length; i++){
            if (lang == 'en'){
                if (allVoices[i].lang.includes(lang)){
                    voicesArray.push(allVoices[i].name)
                    voicesEnArray.push(allVoices[i])
                    if (allVoices[i].name == voice){
                        setCurrentVoice(allVoices[i])
                    }
                }
            } else if (lang == 'ru'){
                if (allVoices[i].lang.includes('ru')){
                    voicesArray.push(allVoices[i].name)
                    voicesRuArray.push(allVoices[i]);
                    if (allVoices[i].name == voice){
                        setCurrentVoice(allVoices[i])
                    }
                }
            }
        }


        setVoices(voicesArray);
        setEnVoices(voicesEnArray);
        setRuVoices(voicesRuArray);

        
    }, [lang, voice])
    

    const handleSpeek = () => {
        const maxL = 50;
        const newText = text.split('.')
        console.log(newText)
        newText.forEach((item) => {
            const utt = new SpeechSynthesisUtterance(item);
            utt.lang = lang;
            utt.voice = currentVoice;
            console.log('utt', utt)
            speechSynthesis.speak(utt)
        })
        // utterance.lang = lang;
        // utterance.voice = currentVoice;
        
        // speechSynthesis.speak(utterance);
        setSpeaking(true)
    };


    const handleStop = () => {
        speechSynthesis.cancel();
        setSpeaking(false);
    }


    return (
        <div className="text-to-speech-form">
            <textarea className="input-text"
                placeholder="Введите текст для озвучки сюда..."
                value={text}
                onChange={e => setText(e.target.value)}

            />
            <div className="settings">
                <DropDownComponent name="Язык" menu={['English', 'Русский']} value={lang} setValue={setLang}/>
                <DropDownComponent name="Голос" menu={voices} value={voice} setValue={setVoice}/>
            </div>
            {!speaking &&
                <div className="go-back-button speek-button" onClick={handleSpeek}>Озвучить</div>
            }
            {speaking && 
                <>
                    <ScaleLoader color="white" height={50} style={{marginTop: "20px"}}/>
                    <div className="go-back-button speek-button" onClick={handleStop}>Остановить</div>
                </>
            }
        </div>
    )
}