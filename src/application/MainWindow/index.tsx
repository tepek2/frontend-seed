import React from 'react';

import { SplitPane, Pane } from 'components/SplitPane';

const MainWindow = () => {
    return (

        <SplitPane orientation="vertical">
            <Pane size='200px'>
                <div style={{backgroundColor: "red"}}>neco </div>
            </Pane>
            <Pane size='800px'>
                <div style={{background: "blue"}}>neco 2</div>
            </Pane>
        </SplitPane>

    )
}

export default MainWindow;
