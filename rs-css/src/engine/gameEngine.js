import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/vs2015.css";

import levelsData from "./levelsData";
import parseHTML from "./parseHTML";
import tryAgainAnime from '../animate/tryAgainAnime';
import winAnime from '../animate/winAnime';
import wrongSelectorAnime from '../animate/wrongSelectorAnime';
import {
    shortestSelector,
    placeholderText,
    gameEndMessage,
    localCurrentLevel, 
    localGameProgress,
    menuIcon, 
    menuCloseIcon, 
    hideMenu,
    showMenu,
    selectEverything,
    fail, 
    done, 
    stopAnimation, 
    highlightLevel,
    woodTag,
    jarTag
} from './constData';

hljs.registerLanguage("xml", xml);

class Elements {
    constructor (loadedLevel) {
        this.currentLevel = loadedLevel;
        this.progress = Array(levelsData.length).fill(0);
    }

    loadLevel (someLevel, index) {
        let serial = index;
        const fragment = document.createDocumentFragment();
        someLevel.forEach((item) => {
            const element = document.createElement(item.element);
            element.setAttribute('data-serial', serial);
            
            if (!item.animation) {
                element.classList.add(stopAnimation);
            }
            if (item.id) {
                element.setAttribute('id', item.id);
            }
            if (item.class) {
                element.classList.add(item.class);
            }
            if (item.children) {
                serial += 1;
                element.classList.add('full-container');
                element.appendChild(this.loadLevel(item.children, serial));
            }
            serial += 1;
            fragment.appendChild(element);
        });
        this.main = fragment;
        return fragment;
    }

    createDocument () {
        this.userInterfaceFragment = document.createDocumentFragment();
        this.quest = document.createElement('p');
        this.screen = document.createElement('div');
        this.codeCSS = document.createElement('input');
        this.codeHTML = document.createElement('div');
        this.menu = document.createElement('button');
        this.menuScreen = document.createElement('div');

        this.quest.classList.add('quest');
        this.screen.classList.add('screen');
        this.codeCSS.classList.add('codecss');
        this.codeHTML.classList.add('codehtml');
        this.menu.classList.add('menu');
        this.menuScreen.classList.add('menuscreen');

        this.quest.textContent = `${levelsData[this.currentLevel].name} : ${levelsData[this.currentLevel].quest}`;
        this.screen.appendChild(this.main);
        this.codeCSS.placeholder = placeholderText;
        this.codeHTML.appendChild(parseHTML(this.screen));
        this.highlight();
        this.menu.innerHTML = menuIcon;
        this.menu.addEventListener('click', () => {
            this.toggleMenu();
        });
        this.levelsList = document.createElement('ol');
        if (localStorage.getItem(localGameProgress)) {
            this.progress = JSON.parse(localStorage.getItem(localGameProgress));
        }
        levelsData.forEach( (level, i) => {
            const element = document.createElement('li');
            element.setAttribute('data-level', i);
            if (this.progress[i] === done) {
                element.classList.add(done);
            } 
            if (this.progress[i] === fail) {
                element.classList.add(fail);
            }
            element.textContent = level.name;
            if (i === this.currentLevel) {
                element.classList.toggle(highlightLevel);
                this.highlightedLevel = element;
            }
            this.levelsList.appendChild(element);
        });
        this.menuScreen.appendChild(this.levelsList);
        this.levelsList.addEventListener('click', (event) => {
            if (event.target !== event.currentTarget) {
                this.highlightedLevel.classList.toggle(highlightLevel);
                this.highlightedLevel = event.target;
                this.highlightedLevel.classList.toggle(highlightLevel);
                this.currentLevel = +event.target.getAttribute('data-level');
                this.codeCSS.value = '';
                this.codeCSS.focus();
                this.loadNextLevel();
                this.saveToLocal();
                this.toggleMenu();
            }
        });

        this.userInterfaceFragment.appendChild(this.quest);
        this.userInterfaceFragment.appendChild(this.screen);
        this.userInterfaceFragment.appendChild(this.codeCSS);
        this.userInterfaceFragment.appendChild(this.codeHTML);
        this.userInterfaceFragment.appendChild(this.menu);
        this.userInterfaceFragment.appendChild(this.menuScreen);
        document.body.appendChild(this.userInterfaceFragment);

        this.highlightCode();
    }

    highlightCode() {
        [...this.codeHTML.children].forEach( block => {
            hljs.highlightBlock(block);
        });
    }

    clearHighlight() {
        if (this.screenElement && this.codeLine) {
            this.popup.remove();
            this.screenElement.classList.toggle('find');
            this.codeLine.classList.toggle('line');
            this.screenElement = null;
            this.codeLine = null;
        }
    }

    highlight() {
        let serial;
        this.screen.addEventListener('mouseleave', this.clearHighlight);
        this.screen.addEventListener('mouseover', (event) => {
            this.clearHighlight();
            if (event.target !== event.currentTarget) {
                this.screenElement = event.target;
                this.screenElement.classList.toggle('find');
                serial = event.target.getAttribute('data-serial');
                this.codeLine = this.codeHTML.querySelector(`[data-serial="${serial}"]`);
                this.codeLine.classList.toggle('line');
                this.createPopup(this.screenElement.outerHTML, this.screenElement.getBoundingClientRect().x);
            }
        });
        this.codeHTML.addEventListener('mouseleave', this.clearHighlight);
        this.codeHTML.addEventListener('mouseover', (event) => {
            this.clearHighlight();
            if (event.target !== event.currentTarget) {
                if (
                    (
                        event.target.closest('.element').tagName === woodTag || 
                        event.target.closest('.element').tagName === jarTag
                    ) &&
                    !event.target.closest('.element').classList.contains('empty-container')
                ) {
                    this.codeLine = event.target.closest('.full-container');
                } else {
                    this.codeLine = event.target.closest('.element');
                }
                this.codeLine.classList.toggle('line');
                serial = this.codeLine.getAttribute('data-serial');
                this.screenElement = this.screen.querySelector(`[data-serial="${serial}"]`);
                this.screenElement.classList.toggle('find');
                this.createPopup(this.screenElement.outerHTML, this.screenElement.getBoundingClientRect().x);
            }
        });
    }

    createPopup (message, xCoordinate) {
        this.popup = document.createElement('popup');
        this.popup.textContent = message.replace(/stop/g, '')
             .replace(/find/g, '')
             .replace(/full-container/g, '')
             .replace(/ class="\s{0,}"/g, '')
             .replace(/ data-serial="\d"/g, '')
             .replace(/<fire><\/fire>(?=<)/, '')
             .replace(/<wind><\/wind>(?=<)/, '')
             .replace(/<life><\/life>(?=<)/, '');
        this.popup.style.left = `${+xCoordinate - 50}px`;
        hljs.highlightBlock(this.popup);
        document.body.appendChild(this.popup);
    }

    loadNextLevel () {
        this.loadLevel(levelsData[this.currentLevel].display, 0);
        this.screen.innerHTML = '';
        this.screen.appendChild(this.main);
        this.codeHTML.innerHTML = '';
        this.codeHTML.appendChild(parseHTML(this.screen));
        this.quest.textContent = `${levelsData[this.currentLevel].name} : ${levelsData[this.currentLevel].quest}`;
        this.highlightCode();
    }

    saveToLocal () {
        localStorage.setItem(localCurrentLevel, this.currentLevel);
    }

    toggleMenu () {
        if (this.menuStatus) {
            this.menuScreen.style.top = hideMenu;
            this.menu.innerHTML = menuIcon;
        } else {
            this.menuScreen.style.top = showMenu;
            this.menu.innerHTML = menuCloseIcon;
        }
        this.menuStatus = !this.menuStatus;
    }

    selectorCheck () {
        let selectedElements = [];
        try {
            if (this.codeCSS.value.length >= shortestSelector || this.codeCSS.value === selectEverything) {
                selectedElements = Array.from(this.screen.querySelectorAll(`.screen ${this.codeCSS.value}`));
            }
        } catch(error) {
            ; // do nothing with error just skip it ¯\_(ツ)_/¯
        }

        if (selectedElements.length) {
            const selected = selectedElements.every( element => {
                return !element.classList.contains(stopAnimation);
            });
            if (selected && selectedElements.length === levelsData[this.currentLevel].count) {
                winAnime(selectedElements);
                this.codeCSS.value = '';
                this.codeCSS.focus();
                this.highlightedLevel.classList.toggle(highlightLevel);
                if (this.progress[this.currentLevel] !== fail) {
                    this.progress[this.currentLevel] = done;
                    localStorage.setItem(localGameProgress, JSON.stringify(this.progress));
                    this.highlightedLevel.classList.add(done);
                }
                this.currentLevel += 1;
                setTimeout( () => {
                    if (levelsData[this.currentLevel]) {
                        this.highlightedLevel = this.levelsList.children[this.currentLevel];
                        this.loadNextLevel();
                    } else {
                        this.screen.innerHTML = '';
                        this.quest.textContent = gameEndMessage;
                        this.currentLevel = levelsData[levelsData.length - 1];
                        localStorage.setItem(localCurrentLevel, levelsData.length - 1);
                    }
                    this.highlightedLevel.classList.toggle(highlightLevel);
                }, 1000);
                this.saveToLocal();
            } else {
                tryAgainAnime(selectedElements);
            }
        } else {
            wrongSelectorAnime([this.codeCSS, this.codeHTML]);
        }
    }
}

export default Elements;
