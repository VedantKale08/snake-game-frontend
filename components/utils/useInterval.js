const { useRef, useLayoutEffect, useEffect } = require("react");

function useInterval(callback, delay) {
    const savedCallback = useRef(callback)
    
    useLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    useEffect(()=>{
        if(!delay && delay !== 0) return;

        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
    },[delay])
}

export default useInterval;