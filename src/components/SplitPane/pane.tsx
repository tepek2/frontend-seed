import React from 'react';
import styled from 'styled-components';
import { useSharedState } from './index';
import { PaneType, VERTICAL, HORIZONTAL } from './splitPaneTypes';

interface PaneProps {
    children: JSX.Element
    size?: string
    minSize?: string
};

const DivVertical = styled.div`width: ${(props: any) => props.size}`;
const DivHorizontal = styled.div`height: ${(props: any) => props.size}`;

export const Pane = ({
    children,
    size,
    minSize,
}: PaneProps): PaneType => {

    const { state, setSize } = useSharedState(); 

    // if (!!size) {setSize(size)};

    const Div = {
        [VERTICAL]: DivVertical,
        [HORIZONTAL]: DivHorizontal,
    }[state.orientation] as any;

    return (
        <Div size={state.size}>
            {children}
        </Div>
    )
};