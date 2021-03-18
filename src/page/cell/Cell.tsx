// Core
import * as React from 'react';

// Styles
const styles = require('./Cell.module.css');

type PropsType = {
    life: number,
}

function Cell (props: PropsType) {
    const { life } = props;

    return (
        <div
            className = { styles.fragmentWrapper }
            style = {{ background: Boolean(life) ? 'black' : 'white' }}
        />
    )
}

export default Cell;