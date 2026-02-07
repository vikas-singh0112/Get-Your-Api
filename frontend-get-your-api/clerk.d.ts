export {};

declare global {
  interface Window {
    Clerk?: any; // You can use 'any' for a quick fix or the specific Clerk type if imported
  }
}