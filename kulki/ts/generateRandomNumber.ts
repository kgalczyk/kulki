const generateRandomNumber = (maxNumber: number, minNumber: number): number => {
    return Math.floor(Math.random() * maxNumber) + minNumber;
}

export default generateRandomNumber;