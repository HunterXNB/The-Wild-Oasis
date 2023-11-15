import { useEffect, useRef } from "react";


export default function useOutsideClick(close, capture = true) {
    const ref = useRef()
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) close();
        }
        document.addEventListener("click", handleClick, capture);
        return () => {
            document.removeEventListener("click", handleClick, capture);
        };
    }, [ref, close])
    return ref
}
