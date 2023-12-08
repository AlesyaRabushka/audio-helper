import React, { useEffect, useReducer, useRef, useState } from "react";
import { DropDownComponent } from "../DropDown/dropDownComponent";
import "./speechToTextComponent.css"; 



export const SpeechToTextComponent = () => {
    const [text, setText] = useState('');
    const [dialogue, setDialogue] = useState([{type:"bot", msg:'Для того, чтобы начать наше общение, зажмите кнопку "Говорить"'}])
    const [lang, setLang] = useState('ru');
    const [isLang, setIsLang] = useState(false);
    const [speaking, setSpeaking] = useState(false)

    const grammar = 
    "#JSGF V1.0; grammar methods; public <method> = hi | hello | how are you ;"
    // const grammarRu = "#JSGF V1.0; grammar methods; public <method> = Привет | Добрый день | Доброе утро | Как дела | Что ты умеешь ;"
    // const grammarRu = ['Привет', "Добрый день", "Доброе утро", 'Как дела', "Что ты умеешь"]

    const activeRef = useRef(null);

    let speechRecognition:any = null;
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        const speechRecognitionList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList)();
        speechRecognitionList.addFromString(grammar)

        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
    }
    else{
        console.error('Web Speech API не поддерживается в этом браузере.');
    }


    // if (lang == 'en'){
    //     // speechRecognitionList.addFromString(grammar,1);
    //     speechRecognition.lang = 'en-US'
    //     setDialogue([{type:"bot", msg:'To start our conversation, please, click and hold the \'Record\' button'}])
    //     // setButtonName('Record')
    // } else if (lang == 'ru'){
    //     speechRecognition.lang = 'ru-RU'
    //     // speechRecognitionList.addFromString(grammarRu,1);
    //     setDialogue([{type:"bot", msg:'Для того, чтобы начать наше общение, зажмите кнопку "Говорить"'}])
    //     // setButtonName('Говорить')
    // }
    
    
    useEffect(() =>{
        if (lang.length != 0){
            setIsLang(true)
        }

        
        
          // Событие при получении результатов распознавания
          speechRecognition.onresult = (event:any) => {
            const results = event.results;
            const finalTranscript = results[results.length - 1][0].transcript;
            console.log('here')
            console.log(finalTranscript);
            setText(finalTranscript);

            // if (lang == 'ru'){
            //     if (text != ''){
            //         const currentDialogueHistory = dialogue;
            //         currentDialogueHistory.push({type:"user", msg:text})
            //         setDialogue(currentDialogueHistory);
            //     }
                
            // } else if (lang == 'en'){
            //     if (text != ''){
            //         const currentDialogueHistory = dialogue;
            //         currentDialogueHistory.push({type:"user", msg:text})
            //         setDialogue(currentDialogueHistory);
            //     }
            // }

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
        const answersRU = [{phrase:'Привет', answer:'И вам привет!'}, {phrase:'Добрый день', answer:'Добрейший!'},
        {phrase:'Как дела', answer:'Всё супер! Как ваши дела?'}, {phrase:'Какие вопросы', answer:'Отстань'},
        {phrase:'Что ты умеешь', answer:'Я умею отвечать на вопросы, ответ на которые мне известен'},
        {phrase:'Хорошо', answer:'Хорошо - лучше, чем нормально...'}, {phrase:'искусство', answer:'Творческое отражение, воспроизведение действительности в художественных образах.'},
        {phrase:'кафка', answer:'Франц Кафка - австрийский писатель еврейского происхождения, широко признаваемый как одна из ключевых фигур литературы XX века.'},
        {phrase:'помоги', answer:'Я могу рассказать:<br>Что я умею<br>Кто такой Кафка<br>Что такое Гордость и предубеждение<br>Главный вопрос жизни'},
        {phrase:'гордость', answer:'Это  <a style={{text-decoration:none}} href="https://ru.wikipedia.org/wiki/%D0%93%D0%BE%D1%80%D0%B4%D0%BE%D1%81%D1%82%D1%8C_%D0%B8_%D0%BF%D1%80%D0%B5%D0%B4%D1%83%D0%B1%D0%B5%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5">роман</a> Джейн Остин, опубликованный в 1813 году. .'},
        {phrase:'жизни', answer:'Главный вопрос жизни, Вселенной и всего такого - 42'},
        {phrase: 'сочинение', answer: "Произведение Франца Кафки 'Замок' является одним из интереснейших для рассмотрения из всех литературных трудов автора. <br>Оно не только захватывает с первых страниц своей непредсказуемостью, но и притягивает, казалось бы, вполне понятным для развития сюжетом, который, однако, ведёт нас не по намеченной тропе. <br>Сюжет разворачивается в небольшой деревне, в которой оказался главный герой, землемер К. С первых же строк читатель может заметить некоторые несостыковки.<br> Лишь мгновением ранее казалось, что смысл и резон произносимых героями речей ясны и понятны, как экспромтом обнаруживается, что вавилонское столпотворение уже у вас в голове.<br>Они не так видны и заметны, но все же присутствуют и представляют собой не маловажные флаги, назовем их так, которые будут преследовать читающего на протяжении всего произведения."}
        // {phrase:'помоги', answer:'Я могу рассказать:\nЧто я умею\nКто такой Кафка\n'},
        ];

        const answersEN = [{phrase: 'Hi', answer:'Hi! May i help you?'}, {phrase:"hello", answer: "Hello!"},
        {phrase:"hel", answer: "I can:<br>Say Hi to you<br>Name my favourite authors<br>Give you a link to read Pride and Prejudice"},
        {phrase:"link", answer: "Of course!! Here you are - <a href='https://libcat.ru/knigi/proza/foreign-prose/85011-dzhejn-ostin-gordost-i-predubezhdenie.html'>link</a>"},
        {phrase:"authors", answer: "Here they are, from the left to the right: <br>Paulo Coelho<br>Franz Kafka<br>Haruki Murakami"},
    ]

        let getAnswer = false;

        if (lang == 'ru'){
            const answers = answersRU;
            
            for (let i = 0; i < answers.length; i++){
                if ((text.toLowerCase()).includes(answers[i].phrase.toLowerCase())){
                    getAnswer = true;

                    const currentDialogueHistory = dialogue;
                    console.log(text)
                    currentDialogueHistory.push({type:'user', msg: text})
                    currentDialogueHistory.push({type: "bot", msg:answers[i].answer})
                    setDialogue(currentDialogueHistory);
                    break
                }
            }

        } else if (lang == 'en'){
            const answers = answersEN;
            console.log('current text',text)
            
            for (let i = 0; i < answers.length; i++){
                if (text.toLowerCase().includes(answers[i].phrase.toLowerCase())){
                    getAnswer = true;

                    const currentDialogueHistory = dialogue;
                    currentDialogueHistory.push({type:'user', msg: text})
                    currentDialogueHistory.push({type: "bot", msg:answers[i].answer})
                    setDialogue(currentDialogueHistory);
                    break
                }
            }
        }
        

        if (!getAnswer){
            if (lang == 'ru'){
                const currentDialogueHistory = dialogue;
                currentDialogueHistory.push({type:"bot", msg:'Извините, но я не знаю, что и ответить. Попробуйте сказать "помоги"'})
                console.log('Извините, но я не знаю, что и ответить...42?')
                setDialogue(currentDialogueHistory);
            } else if (lang == 'en'){
                const currentDialogueHistory = dialogue;
                currentDialogueHistory.push({type:"bot", msg:'Sorry...But i literally have no clue what are you talking about... Try to say "HELP"'})
                setDialogue(currentDialogueHistory);
            }
        }
    }

    const handleStop = () => {
        
        if (speechRecognition != null){
            speechRecognition.stop()
            console.log('stop');
            
            handleFindAnswer(text);

            setTimeout(() => setSpeaking(false), 500)
            // setSpeaking(false);
        }
    }

    

    return(
        <div className="speech-to-text">
            <div className="settings">
                {/* <DropDownComponent name="Язык" menu={['English', 'Русский']} value={lang} setValue={setLang}/> */}
            </div>
            {isLang && <>
                <div className="dialogue-form">
                    <div>{dialogue.map(item => 
                            <div className={`answer type-${item.type}`} dangerouslySetInnerHTML={{__html:item.msg}}/>
                            // {item.msg}</div>
                        )}
                    </div>
                    <div ref={activeRef}></div>
                </div>
                <div className="go-back-button speek-button speech-to-text-b" onMouseDown={handleSpeek} onMouseUp={handleStop}>Говорить</div>
                {/* {speaking && <div className="go-back-button speek-button speech-to-text-b" onClick={handleStop}>Остановить</div>} */}
                {/* <DropDownComponent name="HELP" menu={['Привет','Добрый день' ,'Что ты умеешь', 'Как дела']} value={''} setValue={()=>{}}/> */}
            </>}
        </div>
    )
}