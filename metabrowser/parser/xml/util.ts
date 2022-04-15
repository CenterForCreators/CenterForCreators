export function parseXmlTriplet(xmlTriplet: string): Array<string | undefined> {
  let tokens = xmlTriplet
    .split(",")
    .map((token) => token.trim())

  return [tokens[0], tokens[1], tokens[2]]
}