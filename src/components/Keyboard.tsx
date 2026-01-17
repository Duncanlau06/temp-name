import { useState } from 'react';
import './Keyboard.css';

export default function Keyboard() {
    const [inputText, setInputText] = useState('');
    const [isCaps, setIsCaps] = useState(false);
    const [isShift, setIsShift] = useState(false);
    const [keyboardRows, setKeyboardRows] = useState([
                        ['~.`', '!.1', '@.2', '#.3', '$.4', '%.5', 
                        '^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=', 
                        '<--'],
                        ['Tab', 'q', 'w', 'e', 'r', 't', 'y',
                        'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\'],
                        ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 
                        'j', 'k', 'l', ':_;', `"_'`, 'Enter'],
                        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
                        '<_,', '>_.', '?_/', 'Shift'],
                        ['Ctrl', 'Alt', '␣', 'Ctrl', 'Alt', '<', '>']
                    ]);

        const randomizeKeyboard = () => {
            const allKeys: { key: string; rowIndex: number }[] = [];
            keyboardRows.forEach((row, rowIndex) => {
                row.forEach(key => {
                    allKeys.push({ key, rowIndex });
                });
            });

            for (let i = allKeys.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allKeys[i], allKeys[j]] = [allKeys[j], allKeys[i]];
            }

            // Reconstruct rows with original sizes
            const randomized: string[][] = [];
            let keyIndex = 0;
            keyboardRows.forEach((row) => {
                const newRow: string[] = [];
                for (let i = 0; i < row.length; i++) {
                    newRow.push(allKeys[keyIndex].key);
                    keyIndex++;
                }
                randomized.push(newRow);
            });
            return randomized;
        }

    const parseKeyText = (keyvalue : string) => {
        return keyvalue.includes('.') 
            ? (keyvalue.split('.').map((part, index) => (<span key={index}>{part}</span>))) 
            : keyvalue.includes('_') 
            ? (keyvalue.split('_').map((part, index) => (<span key={index}>{part}</span>)))
            : (<span>{keyvalue}</span>)
    }

    const handleKeyClick = (key : string) => {
        if (key === 'Enter') {
            handleEnterKey();
        } 
        else if(key === "Ctrl" || key === "Alt" || key === '<' || key === '>')
        {
        }else if (key === '␣') {
            handleSpaceKey();
        } else if (key === 'Caps Lock') {
            handleCapsLock();
        } else if (key === '<--') {
            handleDeleteKey();
        } else if (key === 'Shift') {
            handleShiftKey();
        } else if (key === 'Tab') {
            handleTabKey();
        } else {
            handleRegularKey(key);
        }
        setKeyboardRows(randomizeKeyboard());
    };
    const handleSpaceKey = () => {
        const newContent = inputText + '\u00A0';
        setInputText(newContent);
    };
    const handleEnterKey = () => {
        const newContent = inputText + '\n';
        setInputText(newContent);
    };
    const handleCapsLock = () => {
        const updatedCaps = !isCaps;
        setIsCaps(updatedCaps);
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            const firstSpanElement = key.querySelector('span:first-child');
            if (firstSpanElement) {
                const keyText = (firstSpanElement as HTMLElement).innerText.toLowerCase();
                if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab']
                    .includes(keyText)) {
                    (firstSpanElement as HTMLElement).innerText = 
                    ((updatedCaps && isShift) || (!updatedCaps && !isShift)) 
                    ? keyText.toLowerCase() : keyText.toUpperCase();
                }
                if (keyText === 'caps lock' && firstSpanElement.parentElement) {
                    firstSpanElement.parentElement.style.backgroundColor = 
                    (updatedCaps) ? 'blue' : '#445760';
                }
            }   
        });
    };
    const handleTabKey = () => {
        const newContent = inputText + '    ';
        setInputText(newContent);
    };

    const handleDeleteKey = () => {
        if (inputText.length === 0) {
            return;
        }
        const newContent = inputText.slice(0, inputText.length - 1);
        setInputText(newContent);
    };

    const handleShiftKey = () => {
        const updatedShift = !isShift;
        setIsShift(updatedShift);
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            const firstSpanElement = key.querySelector('span:first-child');
            if (firstSpanElement) {
                const keyText = (firstSpanElement as HTMLElement).innerText.toLowerCase();
                if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].
                    includes(keyText)) {
                    (firstSpanElement as HTMLElement).innerText = 
                    ((updatedShift && isCaps) || (!updatedShift && !isCaps)) 
                    ? keyText.toLowerCase() : keyText.toUpperCase();
                }
                if (keyText === 'shift' && firstSpanElement.parentElement) {
                    firstSpanElement.parentElement.style.backgroundColor = 
                    (updatedShift) ? 'blue' : '#445760';
                }
            }
        });
    }

    const handleRegularKey = (key : string) => {
        const keys = key.split(/[._]/);
        let newContent;
        if (keys.length > 1) {
            if (isShift) {
                if (keys.length === 3) {
                    if (keys[0] === '>') newContent = inputText + '>';
                    else newContent = inputText + '_';
                }
                else newContent = inputText + keys[0];
            } else {
                if (keys.length === 3) {
                    if (keys[0] === '>') newContent = inputText + '.';
                    else newContent = inputText + '-';
                }
                else newContent = inputText + keys[1];
            }
        } else {
            let character = ((isShift && isCaps) || (!isShift && !isCaps)) 
            ? key.toLowerCase() : key.toUpperCase();
            newContent = inputText + character;
        }
        setInputText(newContent);
    };

    return (
        <div className='keyboard'>
            <div className="textcontainer">
                <pre>{inputText}</pre>
            </div>
            <div className="keyboardcontainer">
                <div className="container">
                    <div className="row">
                        {keyboardRows[0]
                        .map((keyvalue) => 
                        (
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {parseKeyText(keyvalue)}
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        {keyboardRows[1]
                        .map((keyvalue) => (
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {parseKeyText(keyvalue)}
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        {keyboardRows[2]
                            .map((keyvalue) => (
                            <div key={keyvalue} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {parseKeyText(keyvalue)}
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        {keyboardRows[3].map((keyvalue, index) => (
                            <div key={index} className='key' 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {parseKeyText(keyvalue)}
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        {keyboardRows[4]
                            .map((keyvalue, index) => (
                            <div key={index} className='key' 
                            onClick={() => handleKeyClick(keyvalue)}>
                                {parseKeyText(keyvalue)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}