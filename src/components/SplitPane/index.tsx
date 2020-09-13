import React, { useEffect, useState ,useRef } from 'react';
import styled from 'styled-components';
import { SplitPaneProps, VERTICAL, HORIZONTAL } from './splitPaneTypes';
import { PaneWrapper } from './pane';
export { Pane } from './pane';

const DividerHorizontal = styled.div`cursor: row-resize; height: 10px; margin: -5px 0;`;
const DividerVertical = styled.div`cursor: col-resize; width: 10px; margin: 0 -5px;`;

const FlexHorizontal = styled.div`display: flex; flex-direction: column;`;
const FlexVertical = styled.div`display: flex; flex-direction: row;`;

export const SplitPane = ({ children, orientation }: SplitPaneProps) => {

    const minSize0 = children[0].props.minSize;
    const minSize1 = children[1].props.minSize;

    const [size0, setSize0] = useState(children[0].props.size)
    const [size1, setSize1] = useState(children[1].props.size)


    const Flex = {
        [VERTICAL]: FlexVertical,
        [HORIZONTAL]: FlexHorizontal,
    }[orientation];

    const Divider = {
        [VERTICAL]: DividerVertical,
        [HORIZONTAL]: DividerHorizontal
    }[orientation];

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
        <Flex>
            <PaneWrapper orientation={orientation} size={size0}>
                {children[0]}
            </PaneWrapper>
            <Divider onMouseDown={onMouseDown}/>
            <PaneWrapper orientation={orientation} size={size1}>
                {children[1]}
            </PaneWrapper>
        </Flex>
    );
};
