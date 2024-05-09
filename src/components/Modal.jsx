import React, { useEffect } from 'react';
import {createPortal} from 'react-dom'


export default function Modal({onClose, position, children}) {
    
    const modalRoot = document.querySelector('#modal-root');
    const el = document.createElement('div');

    useEffect(()=> {
        modalRoot.appendChild(el);
        document.addEventListener("keydown", handlekeyDown);
        return () =>{
            modalRoot.removeChild(el);
            document.removeEventListener("keydown", handlekeyDown);   
        }
    },[])

    const handlekeyDown = event => {
        if(event.key === "Escape"){
            onClose();
        }
    }
    
return createPortal( 
    <div>
        <div className="modal-background" onClick={onClose} ></div>
        {position && (
            <div className="modal-content" style={{
                position: 'absolute',
                top: `${400+position.y}px`,
                left: `${700+position.x}px`,
            }}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                {children}
            </div>
        )}
        </div>,
            el
    );
}
