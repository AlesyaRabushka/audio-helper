import React, { useEffect, useReducer, useRef, useState } from "react";
import { DropDownComponent } from "../DropDown/dropDownComponent";
import "./speechToTextComponent.css";



export const SpeechToTextComponent = () => {
    const [text, setText] = useState('');
    const [dialogue, setDialogue] = useState([{type:"bot", msg:'Для того, чтобы начать наше общение, зажмите на кнопку "Говорить"'}])
    const [lang, setLang] = useState('');
    const [isLang, setIsLang] = useState(false);
    const [voice, setVoice] = useState('English (America)+Michael');
    const [speaking, setSpeaking] = useState(false)

    const grammar = 
    "#JSGF V1.0; grammar methods; public <method> = hi | hello | how are you ;"
    const grammarRu = "#JSGF V1.0; grammar methods; public <method> = Привет | Добрый день | Доброе утро | Как дела | Что ты умеешь ;"
    // const grammarRu = ['Привет', "Добрый день", "Доброе утро", 'Как дела', "Что ты умеешь"]

    const activeRef = useRef(null);

    let speechRecognition:any = null;
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        const speechRecognitionList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList)();

        if (lang == 'en'){
            speechRecognitionList.addFromString(grammar,1);
        } else if (lang == 'ru'){
            speechRecognitionList.addFromString(grammarRu,1);
        }
        
        speechRecognition.grammars = speechRecognitionList;

        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
    }
    else{
        console.error('Web Speech API не поддерживается в этом браузере.');
    }
    
    
    useEffect(() =>{
        if (lang.length != 0){
            setIsLang(true)
        }
          // Событие при получении результатов распознавания
          speechRecognition.onresult = (event:any) => {
            const results = event.results;
            const finalTranscript = results[results.length - 1][0].transcript;
            console.log(finalTranscript);
            setText(finalTranscript);

            // if (lang == 'ru'){
                
            //     const currentDialogueHistory = dialogue;
            //     currentDialogueHistory.push({type:"user", msg:finalTranscript})
            //     setDialogue(currentDialogueHistory);
                
            // } else if (lang == 'en'){
            //     if (grammar.includes(finalTranscript)){
            //         setText(finalTranscript);

            //     } else{
            //         const currentDialogueHistory = dialogue;
            //         currentDialogueHistory.push({type:"bot", msg:'Sorry, i don\'t know what to do...'})
            //         setDialogue(currentDialogueHistory);
            //     }
            // }
            // console.log('text',text)
            // console.log('answer',answer)
        };
        
  }, [speaking, lang]);


    const handleSpeek = () => {
        setSpeaking(true)
        setText('');
       
        if (speechRecognition != null){
            speechRecognition.start()
            console.log('start')
        }
       
    }

    const handleFindAnswer = (text:string) => {
        const answers = [{phrase:'Привет', answer:'И вам привет!'}, {phrase:'Добрый день', answer:'Добрейший!'},
        {phrase:'Как дела', answer:'Всё супер! Как ваши дела?'}, {phrase:'Какие вопросы', answer:'Отстань'},
        {phrase:'Что ты умеешь', answer:'Я умею отвечать на вопросы, ответ на которые мне известен'},
        {phrase:'Хорошо', answer:'Хорошо - лучше, чем нормально...'}, {phrase:'Слушай', answer:'Уже слушаю'}];

        let getAnswer = false;
        for (let i = 0; i < answers.length; i++){
            if (answers[i].phrase.toLowerCase() == (text.toLowerCase())){
                getAnswer = true;

                const currentDialogueHistory = dialogue;
                currentDialogueHistory.push({type: "bot", msg:answers[i].answer})
                setDialogue(currentDialogueHistory);
                break
            }
        }

        if (!getAnswer){
            if (lang == 'ru'){
                const currentDialogueHistory = dialogue;
                currentDialogueHistory.push({type:"bot", msg:'Извините, но я не знаю, что и ответить...42?'})
                setDialogue(currentDialogueHistory);
            } else if (lang == 'en'){
                const currentDialogueHistory = dialogue;
                currentDialogueHistory.push({type:"bot", msg:'Sorry...But i do not know what to say ^_^'})
                setDialogue(currentDialogueHistory);
            }
        }
    }

    const handleStop = () => {
        setSpeaking(false);
        if (speechRecognition != null){
            speechRecognition.stop()
            console.log('stop');
            if (lang == 'ru'){
                if (text != ''){
                    const currentDialogueHistory = dialogue;
                    currentDialogueHistory.push({type:"user", msg:text})
                    setDialogue(currentDialogueHistory);
                }
                
            }
            handleFindAnswer(text);
        }
    }

    

    return(
        <div className="speech-to-text">
            <div className="settings">
                <DropDownComponent name="Язык" menu={['English', 'Русский']} value={lang} setValue={setLang}/>
            </div>
            {isLang && <>
                <div className="dialogue-form">
                    <div>{dialogue.map(item => 
                            <div className={`answer type-${item.type}`}>{item.msg}</div>
                        )}</div>
                    <div ref={activeRef}></div>
                </div>
                <div className="go-back-button speek-button speech-to-text-b" onMouseDown={handleSpeek} onMouseUp={handleStop}>Говорить</div>
                {/* {speaking && <div className="go-back-button speek-button speech-to-text-b" onClick={handleStop}>Остановить</div>} */}
                
            </>}
        </div>
    )
}