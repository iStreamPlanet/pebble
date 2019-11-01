import queryString from 'query-string';
import { renderHook } from '@testing-library/react-hooks';
import useQueryStringState from './UseQueryStringState';

jest.mock('query-string');

describe('useQueryStringState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Calls query-string help with correct values and options', () => {
    const mockRouter = {
      location: {
        search: 'foo=bar',
      },
      history: {
        push: jest.fn(),
      },
    };
    renderHook(() => useQueryStringState(mockRouter));
    expect(queryString.parse).toHaveBeenCalledWith(
      mockRouter.location.search,
      { parseNumbers: true, arrayFormat: 'comma' },
    );
  });

  it('returns the parsed query plus the defaults', () => {
    const mockRouter = {
      location: {
        search: 'foo=1',
      },
      history: {
        push: jest.fn(),
      },
    };
    queryString.parse.mockReturnValue({ foo: 1 });
    const {
      result: { current },
    } = renderHook(() =>
      useQueryStringState(mockRouter, { baz: 'buz', foo: 2 }),
    );
    expect(current[0]).toEqual({
      foo: 1,
      baz: 'buz',
    });
  });
  it('returns a set function that stringifies and calls push', () => {
    const mockRouter = {
      location: {
        search: 'foo=1',
        pathname: 'path',
      },
      history: {
        push: jest.fn(),
      },
    };
    queryString.stringify.mockReturnValue('stringifiedValue');
    const {
      result: { current },
    } = renderHook(() =>
      useQueryStringState(mockRouter, { baz: 'buz', foo: 2 }),
    );
    const setState = current[1];
    setState({ value: 'foo', array: [1, 2, 3] });
    expect(queryString.stringify).toHaveBeenCalledWith(
      { value: 'foo', array: [1, 2, 3] },
      { arrayFormat: 'comma' },
    );
    expect(mockRouter.history.push).toHaveBeenCalledWith({
      pathname: 'path',
      search: 'stringifiedValue',
    });
  });
});
