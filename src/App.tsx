// Core
import React from 'react';
import './App.css';

// Components
import Page from "./page/Page";

// Styles
const styles = require('./App.module.css');


type StateType = {
    grid: Array<number>,
    size: number,
    testMode: boolean,
}

interface RefObject {
    current: any | null,
}


class App extends React.Component<any, StateType>{
    state = {
        grid: [],
        size: 5,
        testMode: false,
    };

    interval:RefObject = React.createRef();

    componentDidMount() {
        this.initialLife(this.state.size);
        this.ticking();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<StateType>) {
        if(prevState.size !== this.state.size && !this.state.testMode){
            this.initialLife(this.state.size);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval.current);
    }

    getRandomInt() {
        return Math.floor(Math.random() * Math.floor(2));
    }


    initialLife (size: number): void {
        const initialArray = [];

        for (let i = 0; i < size * size; i++) {
            initialArray.push(this.getRandomInt());
        }

        this.setState({ grid: initialArray });
    }

    lifeCycle (cells: Array<number>): Array<number> {
        const newCells = cells.slice(0);
        const row = Math.sqrt(cells.length);
        for (let i = 0; i < cells.length; i++){
            let neighbors = 0;

            if (cells[ i - 1 ] && (i + 1)  % row !== 1) {
                neighbors++;
            }
            if (cells[ i + 1 ] && (i + 1) % row !== 0) {
                neighbors++;
            }

            if (cells[ i - row ]) {
                neighbors++;
            }

            if (cells[ i + row ]) {
                neighbors++;
            }

            if (cells[ i + row + 1 ] && (i + 1) % row !== 0) {
                neighbors++;
            }

            if (cells[ i + row - 1 ] && (i + 1) % row !== 1) {
                neighbors++;
            }

            if (cells[ i - row + 1 ] && (i + 1) % row !== 0) {
                neighbors++;
            }

            if (cells[ i - row - 1 ] && (i + 1) % row !== 1) {
                neighbors++;
            }

            if(cells[i] === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    newCells[i] = 0;
                }
            } else {
                if (neighbors > 2) {
                    newCells[i] = 1;
                }
            }
        }

        return newCells;

    }

    ticking (): void {
        this.interval.current = setInterval(() => {
            this.setState({ grid: this.lifeCycle(this.state.grid)});
        }, 1000);
    }

    test (type: 'first' | 'second'): void {
        this.setState({
            size: type === 'first' ? 5 : 6,
            grid: type === 'first' ? [ 0,0,0,0,0, 0,0,0,0,0, 0,1,1,1,0, 0,0,0,0,0, 0,0,0,0,0,] : [ 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,1,1,1,0, 0,1,1,1,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0,],
            testMode: true,
        });
    }

    sizeChanger (size: number): void {
        this.setState({ size, testMode: false, });
    }

    render(): JSX.Element {
        const { grid, size } = this.state;

        return (
            <div className = { styles.appWrapper }>
                <h2>Timer</h2>
                <div className = { styles.buttonGroup }>
                    <button onClick = { () => { this.ticking() } }>Play</button>
                    <button onClick = { () => { clearInterval(this.interval.current) } }>Stop</button>
                    <button onClick = { () => {  this.setState({ grid: this.lifeCycle(this.state.grid)}) } }>Tick</button>
                </div>
                <h2>Choose the size</h2>
                <div className = { styles.buttonGroup }>
                    <button onClick = { () => this.sizeChanger(5) }>5 x 5</button>
                    <button onClick = { () => this.sizeChanger(25) }>25 x 25</button>
                    <button onClick = { () => this.sizeChanger(50) }>50 x 50</button>
                </div>
                <h2>Tests</h2>
                <div className = { styles.buttonGroup }>
                    <button onClick = { () => this.test('first') }>First Test</button>
                    <button onClick = { () => this.test('second') }>SecondTest</button>
                </div>
                <Page grid = { grid } size = { size }/>
            </div>
        );
    }
}

export default App;
