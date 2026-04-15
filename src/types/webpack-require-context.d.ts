declare namespace NodeJS {
  interface RequireContext {
    keys(): string[]
    <T = any>(id: string): T
  }

  interface Require {
    context(directory: string, useSubdirectories: boolean, regExp: RegExp): RequireContext
  }
}
