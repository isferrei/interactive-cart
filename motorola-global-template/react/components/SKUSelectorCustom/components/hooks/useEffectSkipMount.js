import { useEffect, useRef } from 'react';
const useEffectSkipMount = (func, deps) => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        return func();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};
export default useEffectSkipMount;