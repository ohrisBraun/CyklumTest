// Core
import * as React from 'react';

// Components
import Cell from './cell/Cell';

// Styles
const styles = require('./Page.module.css');

type PropsType = {
    grid: Array<number>,
    size: number,
}

function Page(props: PropsType) {
    const { grid, size } = props;

    return(
        <>
            <div className = { styles.displayWrapper } style = {{ height: `${size * 10}px`, width: `${size * 10}px` }}>
                { grid.map((cell:number, index:number) => <Cell key = {index + cell * 10000} life = { cell } />) }
            </div>
        </>
    )
}

export default Page;