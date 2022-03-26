export function isObject(maybeObject: any): boolean {
  return typeof maybeObject === "object" && maybeObject !== null
}

export function isArray(maybeArray: any): boolean {
  return Array.isArray(maybeArray)
}