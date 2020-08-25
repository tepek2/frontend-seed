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

const DividerHorizontal = styled.div`cursor: row-resize; height: 10px; margin: -5px 0;`;
const DividerVertical = styled.div`cursor: col-resize; width: 10px; margin: 0 -5px;`;

const FlexHorizontal = styled.div`display: flex; flex-direction: column;`;
const FlexVertical = styled.div`display: flex; flex-direction: row;`;

export const SplitPane = ({ children, orientation }: SplitPaneProps) => {
    const Flex = {
        [VERTICAL]: FlexVertical,
        [HORIZONTAL]: FlexHorizontal,
    }[orientation];

    const Divider = {
        [VERTICAL]: DividerVertical,
        [HORIZONTAL]: DividerHorizontal
    }[orientation];

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
            <Flex>
                {children[0]}
                <Divider/>
                {children[1]}
            </Flex>
        </SharedComponentContext.Provider>

    );
};

