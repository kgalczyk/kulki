export default interface BoardProperties {
    setWidth: (number: number) => void
    getWidth: () => number,
    setHeight: (number: number) => void
    getHeight: () => number,
}