import React from 'react';
import styled from 'styled-components';
import { useSharedState } from './index';
import { PaneType, Orientation, VERTICAL, HORIZONTAL } from './splitPaneTypes';

interface PaneProps {
    children: JSX.Element
    size?: string
    minSize?: string
};

export const Pane = ({
    children,
    size,
    minSize,
}: PaneProps): PaneType => {
    const paneStyle = {
        [VERTICAL]: `width: ${size}`,
        [HORIZONTAL]: `height: ${size}`,
    };

    const { state } = useSharedState(); 

    const Div = styled.div`${paneStyle[state.orientation as Orientation]}`;

    return (
        <Div>
            {children}
        </Div>
    )
};