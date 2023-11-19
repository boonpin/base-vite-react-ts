import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const useInterval = (callback: () => any, delay: number) => {
    const savedCallback = useRef<any>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        if (delay > 0) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export const useWindowSize = () => {

    function debounce<A, R>(fn: (args: A) => R, ms: number) {
        let timeoutId: NodeJS.Timeout;
        return (args: A) => {
            clearTimeout(timeoutId);
            return new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => {
                    try {
                        const result = fn(args);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                }, ms);
            });
        };
    }

    const [size, setSize] = useState<{ width: number, height: number }>();
    useLayoutEffect(() => {
        function updateSize() {
            setSize({width: window.innerWidth, height: window.innerHeight});
        }

        const debouncedUpdateSize = debounce(updateSize, 500);
        window.addEventListener("resize", debouncedUpdateSize);
        updateSize();
        return () => window.removeEventListener("resize", debouncedUpdateSize);
    }, []);

    return size;
};
