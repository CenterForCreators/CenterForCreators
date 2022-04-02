export function isObject(maybeObject: any): boolean {
  return typeof maybeObject === "object" && maybeObject !== null && !Array.isArray(maybeObject)
}

export function isArray(maybeArray: any): boolean {
  return Array.isArray(maybeArray)
}