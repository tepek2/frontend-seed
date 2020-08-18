import React, { createContext, useState, useEffect, useContext } from 'react';

const defaultState = {
    orientation: '',
};

export const SharedComponentContext: React.Context<any> = createContext({
    state: defaultState,
    setState: () => {},
});

export const SharedStateProvider = ({ children }: any) => {
    const [state, setState] =useState(defaultState); 
    
    const [contextValue, setContextValue] = useState({
        state,
        setState: (key: string, val: string) => {
            setState(state => {
                return { ...state, [key]: val};
            });
        }
    });

    useEffect(() => {
        setContextValue(currentValue => ({
            ...currentValue,
            state,
        }));
    }, [state]);

    return (
        <SharedComponentContext.Provider value={contextValue}>
            {children}
        </SharedComponentContext.Provider>

    );
};

export const useShareadCount = () => {
    const {state, setSharedSte} = useContext(SharedComponentContext);

    const setOrientation = (orientation: string) => setSharedSte('orientation', orientation);

    return {state, setOrientation};
};
