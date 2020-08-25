import React from 'react';
import styled from 'styled-components';
import { useSharedState } from './index';
import { PaneType, Orientation, VERTICAL, HORIZONTAL } from './splitPaneTypes';

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

    const { state } = useSharedState(); 

    const Div = {
        [VERTICAL]: DivVertical,
        [HORIZONTAL]: DivHorizontal,
    }[state.orientation as Orientation] as any;

    return (
        <Div size={size}>
            {children}
        </Div>
    )
};