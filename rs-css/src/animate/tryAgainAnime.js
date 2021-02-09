const tryAgainAnime = selectedElements => {
    selectedElements.forEach( element => {
        element.animate([
            { marginTop: 0 },
            { marginTop: '-20px' },
            { marginTop: 0 },
            { marginTop: '20px' },
            { marginTop: 0 },
            { marginTop: '-20px' },
            { marginTop: 0 },
            { marginTop: '20px' },
            { marginTop: 0 }
        ],{
            duration: 1000,
            easing: 'ease'
        });
    });
}

export default tryAgainAnime;
