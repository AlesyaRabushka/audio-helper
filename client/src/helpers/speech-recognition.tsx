import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionExample = () => {
    const [message, setMessage] = useState('');
    const [isListening, setIsListening] = useState(false);




    
    const commands = [
        {
            command: ['Привет *', 'Хаю хай *', '*'],
            callback: () => setMessage(`И вам моё снежное Привет! Какое задание для меня на этот раз?`)
        },
        {
            command: ['Здравствуйте *', 'Добрый день *', 'Доброго времени суток *'],
            callback: (greeting:any) => setMessage(`Категорически вас приветствую! ${greeting}. Чем могу быть полезен?`)
        },
        {
            command: ['Просыпайся *', 'Доброе утро *'],
            callback: () => setMessage('Привет, молодежь! Или как мы с вами любим говорить: привет - медвед, молодежь!! С концом спячки, ребята! Чем обязан?')
        }

        ]

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    let text = ''
    recognition.addEventListener('result', (event) => {
        text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        console.log(event)
    })


    recognition.addEventListener('end', () => {
        recognition.start()
    })

    recognition.start();

    return (
        <div>
           
        {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
        {/* <button onClick={recognition.start}>Start</button>
        <button onClick={recognition.stop}>Stop</button> */}
        {/* <button onClick={e => resetTranscript()}>Reset</button> */}
        {/* <p>{message}</p> */}
        <div>{text}</div>
        {/* {transcript && <p>HIHIHIHI</p>} */}
        </div>
    );
}

export default SpeechRecognitionExample;