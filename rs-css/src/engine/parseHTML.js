import { woodTag, jarTag} from './constData'

const parseHTML = html => {
    const fragment = document.createDocumentFragment();
    Array.from(html.children).forEach((element) => {
        const line = document.createElement(element.tagName);
        line.classList.add('element');
        const serial = element.getAttribute('data-serial');
        line.setAttribute('data-serial', serial);
        if (element.children.length) {
            const openTag = document.createElement(element.tagName);
            const closeTag = document.createElement(element.tagName);
            openTag.classList.add('element');
            closeTag.classList.add('element');
            openTag.setAttribute('data-serial', serial);
            closeTag.setAttribute('data-serial', serial);
            openTag.textContent = `<${element.tagName.toLowerCase()}>`;
            closeTag.textContent = `</${element.tagName.toLowerCase()}>`;
            line.appendChild(openTag);
            line.appendChild(parseHTML(element));
            line.appendChild(closeTag);
            line.classList.add('full-container');
        } else {
            if (element.tagName === woodTag || element.tagName === jarTag) {
                line.classList.add('empty-container');
            }
            line.textContent = element.outerHTML
                .replace(/ class="stop"/, '')
                .replace(/ data-serial="\d"/, '');
        }
        fragment.appendChild(line);
    });
    return fragment;
}

export default parseHTML;
