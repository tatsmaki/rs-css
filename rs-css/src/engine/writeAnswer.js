import levelsData from "./levelsData";

const writeAnswer = (level, paper) => {
    const {answer} = levelsData[level];
    let letter = 0;
    let interval;
    const writeLetter = () => {
        paper.value += answer[letter];
        letter += 1;
        if (!answer[letter]) {
            clearInterval(interval);
            paper.focus();
        }
    }
    interval = setInterval(writeLetter, 100);
}

export default writeAnswer;