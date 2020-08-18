import React from 'react';
import styled from 'styled-components';

const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';


const FlexStyle = {
    [VERTICAL]: 'display: flex; flex-direction: row;',
    [HORIZONTAL]: 'display: flex; flex-direction: column;',
}

const DividerStyles = {
    [VERTICAL]: 'cursor: col-resize; width: 10px; margin: 0 -5px;',
    [HORIZONTAL]: 'cursor: row-resize; height: 10px; margin: -5px 0;',
}

interface SplitPaneProps {
    children: PaneType[]
    orientation: 'vertical' | 'horizontal'
}

interface PaneProps {
    children: any
    size?: string
    minSize?: string
    maxSize?: string
    orientation: 'vertical' | 'horizontal'
}

type PaneType = JSX.Element;

export const Pane = ({
    children,
    size,
    minSize,
    maxSize,
    orientation,
}: PaneProps): PaneType => {
    const paneStyle = {
        [VERTICAL]: `width: ${size}`,
        [HORIZONTAL]: `height: ${size}`,
    };

    const Div = styled.div`${paneStyle[orientation]}`;

    return (
        <Div>
            {children}
        </Div>
    )
}


export const SplitPane = ({
    children,
    orientation,
}: SplitPaneProps) => {

    const Div = styled.div`${FlexStyle[orientation]}`
    const Divider = styled.span`${DividerStyles[orientation]}`

    const panes = children.map((child) => React.cloneElement(child, {orientation}));
    
    return (
        <Div>
            {panes[0]}
            <Divider/>
            {panes[1]}
        </Div>
    )
}
