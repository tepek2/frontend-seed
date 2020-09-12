export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';

export type PaneType = JSX.Element;

export type Orientation = 'vertical' | 'horizontal';

export interface SplitPaneProps {
    children: PaneType[]
    orientation: Orientation
};

export interface SharedContextState {
    orientation: Orientation
    size: string
}

export interface SharedContextProps {
    state: SharedContextState
    setState: (key: string, val: string) => void
};
