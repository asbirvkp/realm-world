declare module 'process/browser' {
  global {
    namespace NodeJS {
      interface Process {
        browser: boolean;
      }
    }
  }
}
