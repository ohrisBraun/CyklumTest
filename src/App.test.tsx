import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'
import TestRenderer from 'react-test-renderer';

test('render Timer', () => {
  render(<App />);
  const linkElement = screen.getByText(/Timer/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App tests',() => {
  test('Function Test',() => {
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    instance.test('first')
    expect(instance.state.size).toBe(5);
    instance.test('second')
    expect(instance.state.size).toBe(6);
  })

  test('Ticking Test',() => {
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    instance.interval.current = null;
    expect(instance.interval.current).toBeNull();
    instance.ticking();
    expect(instance.interval.current).toBeTruthy();
  })

  test('SizeChanger Test',() => {
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    expect(instance.state.size).toBe(5);
    instance.sizeChanger(25);
    expect(instance.state.size).toBe(25);
  })

  test('GetRandom Test', () => {
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    expect(typeof instance.getRandomInt()).toBe('number');
  });

  test('InitialLife Test', () => {
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    expect(instance.state.grid.length).toBe(25);
    instance.initialLife(50);
    expect(instance.state.grid.length).toBe(2500);
  });

  test('LifeCycle Test', () => {
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    expect(instance.lifeCycle([0,1,0,0])).toStrictEqual([0,0,0,0]);
    expect(instance.lifeCycle([1,1,1,1])).toStrictEqual([1,1,1,1]);
    expect(instance.lifeCycle([0,0,0,1,1,1,0,0,0])).toStrictEqual([0,1,0,0,1,0,0,1,0]);
  });

  test('Render Test', () => {
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    instance.render = jest.fn();
    instance.sizeChanger(25);
    expect(instance.render).toHaveBeenCalled();
  });

  test('Interval Test', () => {
    jest.useFakeTimers();
    const testRenderer = TestRenderer.create(
        <App/>
    );
    const instance = testRenderer.getInstance();
    instance.setState = jest.fn();
    jest.advanceTimersByTime(1000);
    expect(instance.setState).toHaveBeenCalled();
  });
});

