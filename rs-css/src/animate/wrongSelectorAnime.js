const wrongSelectorAnime = selectedElements => {
    selectedElements.forEach( element => {
        element.animate([
            { marginLeft: 0 },
            { marginLeft: '-20px' },
            { marginLeft: 0 },
            { marginLeft: '20px' },
            { marginLeft: 0 },
            { marginLeft: '-20px' },
            { marginLeft: 0 },
            { marginLeft: '20px' },
            { marginLeft: 0 }
        ],{
            duration: 1000,
            easing: 'ease'
        });
    });
}

export default wrongSelectorAnime;
