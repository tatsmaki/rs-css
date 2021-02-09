import './index.css';
import levelsData from './engine/levelsData';
import Elements from './engine/gameEngine';
import writeAnswer from './engine/writeAnswer';
import {
    firstLevel,
    resetText, 
    helpIcon, 
    enterText, 
    fail, 
    done, 
    localCurrentLevel, 
    localGameProgress, 
    highlightLevel,
    githubLink,
    rssLink
} from './engine/constData';

let loadedLevel = firstLevel;

if (localStorage.getItem(localCurrentLevel)) {
    loadedLevel = parseInt(localStorage.getItem(localCurrentLevel), 10);
}

const Game = new Elements(loadedLevel);
Game.loadLevel(levelsData[loadedLevel].display, 0);
Game.createDocument();
Game.codeCSS.focus();

const enterFunction = () => {
    Game.selectorCheck();
    Game.codeCSS.focus();
}

const enterKeyPress = key => {
    if (key.which === 13) {
        Game.selectorCheck();
    }
}

const helpFunction = () => {
    if (Game.progress[Game.currentLevel] !== done) {
        Game.highlightedLevel.classList.add(fail);
        Game.progress[Game.currentLevel] = fail;
        localStorage.setItem(localGameProgress, JSON.stringify(Game.progress));
    }
    Game.codeCSS.value = '';
    writeAnswer(Game.currentLevel, Game.codeCSS);
}

const resetFunction = () => {
    localStorage.clear();
    Game.progress.fill(0);
    Game.highlightedLevel.classList.toggle(highlightLevel);
    [Game.highlightedLevel] = [Game.levelsList.children[0]];
    Game.highlightedLevel.classList.toggle(highlightLevel);
    Game.currentLevel = firstLevel;
    Game.codeCSS.value = '';
    Game.loadNextLevel();
    Game.toggleMenu();
    Array.from(Game.levelsList.children).forEach(listItem => {
        if (listItem.classList.contains(fail)) {
            listItem.classList.toggle(fail);
        }
        if (listItem.classList.contains(done)) {
            listItem.classList.toggle(done);
        }
    });
    Game.codeCSS.focus();
}

const enterBtn = document.createElement('button');
enterBtn.classList.add('enter');
enterBtn.textContent = enterText;
document.body.appendChild(enterBtn);
enterBtn.addEventListener('click', enterFunction);

window.addEventListener('keydown', enterKeyPress);

const resetBtn = document.createElement('button');
resetBtn.classList.add('reset');
resetBtn.textContent = resetText;
Game.menuScreen.appendChild(resetBtn);
resetBtn.addEventListener('click', resetFunction);

const helpBtn = document.createElement('div');
helpBtn.classList.add('help');
helpBtn.innerHTML = helpIcon;
document.body.appendChild(helpBtn);
helpBtn.addEventListener('click', helpFunction);

const footer = document.createElement('div');
footer.classList.add('footer')
const logo = document.createElement('a');
logo.classList.add('logo');
logo.href = rssLink;
const git = document.createElement('a');
git.classList.add('git');
git.href = githubLink;
const year = document.createElement('div');
year.classList.add('year');
footer.appendChild(git);
footer.appendChild(year);
footer.appendChild(logo);
Game.menuScreen.appendChild(footer);
