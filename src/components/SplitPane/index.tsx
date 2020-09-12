import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { SharedContextProps, SplitPaneProps, VERTICAL, HORIZONTAL } from './splitPaneTypes';
export { Pane } from './pane';

const SharedComponentContext = createContext<any>(null);

export const useSharedState = () => {
    const {state, setState} = useContext<SharedContextProps>(SharedComponentContext);

    const setOrientation = (orientation: string) => setState('orientation', orientation);
    const setSize = (orientation: string) => setState('size', orientation);

    return {state, setOrientation, setSize};
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

    const [state, setState] = useState({ orientation }); 
    
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

    const dividerPosition = useRef<number | null>();

    const onMouseDown = (e: React.MouseEvent) => {

        dividerPosition.current = {
            [VERTICAL]: e.clientX,
            [HORIZONTAL]: e.clientY
        }[orientation];
    }

    const onMouseUp = () => {
        dividerPosition.current = null;
    }

    const onMouseMove = (e: MouseEvent) => {
        // const { setOrientation } = useSharedState();
        // setOrientation()

    }

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    })

    return (
        <SharedComponentContext.Provider value={contextValue}>
            <Flex>
                {children[0]}
                <Divider onMouseDown={onMouseDown}/>
                {children[1]}
            </Flex>
        </SharedComponentContext.Provider>

    );
};
