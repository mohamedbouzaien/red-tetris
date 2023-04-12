import { renderHook, act } from '@testing-library/react';
import { useInterval } from '../src/client/hooks/useInterval';

jest.useFakeTimers();

describe('useInterval', () => {
  it('should call the callback function after the specified delay', () => {
    const callback = jest.fn();
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toHaveBeenCalled();

    // Fast-forward time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Fast-forward time by another 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not call the callback function if delay is null', () => {
    const callback = jest.fn();
    const delay = null;

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toHaveBeenCalled();

    // Fast-forward time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});