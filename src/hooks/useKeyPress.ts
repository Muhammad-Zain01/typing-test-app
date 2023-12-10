'use client'
import { useEffect } from 'react';

const useKeyPress = (fn) => {
    useEffect(() => {
        const downHandler = (e) => {
            const { key } = e;
            if ((key.length === 1 || key === "Backspace")) {
                fn(key);
            }

            if (e.keyCode == 32 && e.target == document.body) {
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    }, []);
};

export default useKeyPress;