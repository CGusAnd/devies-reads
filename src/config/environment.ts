/**
 * Create a typed version to ease type checking and avoid having to do annoying casts like "process.env.BACKEND_URL as string"
 */
class Environment {
  readonly BACKEND_URL: string = "";
  readonly NEXT_PUBLIC_BASE_URL: string = "http://localhost:3000";
  constructor() {
    Object.assign(this, process.env);
  }
}

export const env = new Environment();
