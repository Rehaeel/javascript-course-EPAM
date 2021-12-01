# Debugging sites

## [Assessment](https://asmt.epam.com).

1. One of Memory Leaks is that Live JavaScript Memory is continuously increasing. It means that either new objects are still created or existing ones are growing.
2. **S.port1.onmessage()** was the longest function call on this site.
3. First meaningful page is loaded after **889ms.**

## [Vacation](https://vacation.epam.com/)

1. Here Live JavaScript Memory is also continuously increasing.
2. **10 '(anonymous)' functions - setTimeouts** and **m.fx.tick()** were the longest function calls.
3. First meaningful page is loaded after **3745ms.**

## [Feedback](https://feedback.epam.com/)

1. Can't see any worrisome Memory Leaks. Live JavaScript Memory stays on decent level. Garbage collector cleans JS heap. Memory is well managed.
2. **Wa()** function was the longest loading with **10.7ms** load time.
3. First meaningful page is loaded after **1406ms.**
