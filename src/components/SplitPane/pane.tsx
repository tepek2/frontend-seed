import React from 'react';
import styled from 'styled-components';
import { PaneType, VERTICAL, HORIZONTAL, Orientation } from './splitPaneTypes';

interface PaneProps {
    children: JSX.Element
    size?: string
    minSize?: string
};

interface PaneWrapperProps {
    children: PaneType
    size?: string
    orientation: Orientation
};

export const Pane = ({
    children,
    size,
    minSize,
}: PaneProps): PaneType => {
    return children;
};

export const PaneWrapper = ({
    children,
    size,
    orientation,
}: PaneWrapperProps): JSX.Element => {
    const Div = {
        [VERTICAL]: styled.div`width: ${(props: any) => props.size}`,
        [HORIZONTAL]: styled.div`height: ${(props: any) => props.size}`,
    }[orientation] as any;

    return (
        <Div size={size}>
            {children}
        </Div>
    )
};