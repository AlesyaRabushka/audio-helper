import React, { useRef, useState } from "react"
import './dropDownComponent.css'



export const DropDownComponent = ({name, menu, value, setValue}: {name:string, menu:Array<string>, value:any, setValue:Function}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [currentName, setCurrentName] = useState(name)

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleChange = (item:string) => {
        if (name == 'Язык'){
            handleLangChange(item)
        } else if (name == 'Голос'){
            handleVoiceChange(item)
        }
    }

    const handleLangChange = (item:string) => {
        setCurrentName(item)
        if (item == 'English'){
            setValue('en-US')
        } else{
            if (item == 'Русский'){
                setValue('ru')
            }
        }
    }

    const handleVoiceChange = (item:string) => {
        setCurrentName(item);
        setValue(item);
        console.log('item', item)
    }

    const activeRef = useRef(null);
    window.addEventListener('click',(e) =>{
        if (e.target !== activeRef.current){
            setShowMenu(false)
        }
    })

    return (
        <div className="drop-down">
            <div className="drop-down-button" onClick={handleShowMenu} ref={activeRef}>
                {currentName}
            </div>

            {showMenu &&
            <div className="drop-down-menu">
                {menu.map(item => 
                    <div className="drop-down-menu-item" onClick={e => handleChange(item)}>
                        {item}
                    </div>
                )}
            </div>
            }
        </div>
    )
}