import { debounce } from "../src";
// import { DebounceFn, IDebounce } from "../src/types";

// test("Debounce", () => {
describe("Test that debounce is working", () => {
  it("should complete, but not too many times", () => {
    const testAttempts = 5;
    let testTries = 0;
    function test() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(++testTries);
        }, 1000);
      });
    }

    const debouncedTest = debounce<number>({
      delay: 1000,
      fn: (data) => {
        expect(data).toBe(testAttempts);
      },
    });
    const debounceTest1 = () =>
      debouncedTest(test, "Test debounce", { value: test });

    for (let i = 0; i < testAttempts; i++) {
      debounceTest1();
    }
  });
});
// });
