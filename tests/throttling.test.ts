import { throttling } from "../src";
// import { DebounceFn, IDebounce } from "../src/types";

// test("Debounce", () => {
describe("Test that throttling is working", () => {
  it("should complete, but not too many times", () => {
    const testAttempts = 5;
    let testTries = 0;
    function test() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(++testTries);
        }, 25);
      });
    }

    const throttlingTest = throttling<number>({
      delay: 1000,
      fn: (data) => {
        expect(data).toBe(testTries);
      },
    });
    const throttlingTest1 = () =>
      throttlingTest(test, "Test debounce", { value: test });

    for (let i = 0; i < testAttempts; i++) {
      throttlingTest1();
    }
  });
});
// });
