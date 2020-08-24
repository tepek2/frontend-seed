import React, { createContext, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SplitPaneProps, VERTICAL, HORIZONTAL } from './splitPaneTypes';
export { Pane } from './pane';

const defaultState = {
    orientation: '',
};

const SharedComponentContext: React.Context<any> = createContext({
    state: defaultState,
    setState: () => {},
});

export const useSharedState = () => {
    const {state, setState} = useContext(SharedComponentContext);

    const setOrientation = (orientation: string) => setState('orientation', orientation);

    return {state, setOrientation};
};

export const SplitPane = ({ children, orientation }: SplitPaneProps) => {
    const FlexStyle = {
        [VERTICAL]: 'display: flex; flex-direction: row;',
        [HORIZONTAL]: 'display: flex; flex-direction: column;',
    };

    const DividerStyles = {
        [VERTICAL]: 'cursor: col-resize; width: 10px; margin: 0 -5px;',
        [HORIZONTAL]: 'cursor: row-resize; height: 10px; margin: -5px 0;',
    };

    const Div = styled.div`${FlexStyle[orientation]}`
    const Divider = styled.span`${DividerStyles[orientation]}`

    const [state, setState] =useState({ ...defaultState, orientation }); 
    
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
            <Div>
                {children[0]}
                <Divider/>
                {children[1]}
            </Div>
        </SharedComponentContext.Provider>

    );
};

