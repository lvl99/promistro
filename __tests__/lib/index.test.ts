import promistro from "../../lib";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it("should create a debounced promise which is thenable", () => {
  const spy = jest.fn((i) => i);

  const test = {
    trigger: promistro(spy),
  };
  expect(test.trigger).toBeInstanceOf(Function);

  jest.spyOn(test, "trigger");

  const debouncedPromise = test.trigger(1);
  expect(debouncedPromise).toBeInstanceOf(Promise);

  const debouncedPromise2 = test.trigger(2);
  expect(debouncedPromise2).toBe(debouncedPromise);

  debouncedPromise.then(spy);
  debouncedPromise2.then(spy);
  test.trigger(3).then(spy);
  jest.runAllTimers();

  expect(test.trigger).toHaveBeenCalledTimes(3);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy.mock.calls[0][0]).toBe(3);
});

it("should create a debounced promise which is executed on first trigger", () => {
  const spy = jest.fn((i) => i);

  const test = {
    trigger: promistro(spy, { leading: true }),
  };
  expect(test.trigger).toBeInstanceOf(Function);

  jest.spyOn(test, "trigger");

  test.trigger(1).then(spy);
  test.trigger(2).then(spy);
  test.trigger(3).then(spy);
  jest.runAllTimers();

  expect(test.trigger).toHaveBeenCalledTimes(3);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy.mock.calls[0][0]).toBe(1);
  expect(spy.mock.calls[1][0]).toBe(3);
});

it("should create a debounced promise which accumulates arguments provided to the trigger function", () => {
  const spy = jest.fn((i) => i);

  const test = {
    trigger: promistro(spy, { accumulate: true }),
  };
  expect(test.trigger).toBeInstanceOf(Function);

  jest.spyOn(test, "trigger");

  test.trigger(1).then(spy);
  test.trigger(2).then(spy);
  test.trigger(3).then(spy);
  jest.runAllTimers();

  expect(test.trigger).toHaveBeenCalledTimes(3);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy.mock.calls[0][0]).toEqual(expect.arrayContaining([[1], [2], [3]]));
});
