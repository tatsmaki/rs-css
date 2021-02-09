const winAnime = selectedElements => {
    selectedElements.forEach( element => {
        element.animate([
            { marginTop: '-100vh'}
        ],{
            duration: 1000,
            easing: 'ease'
        });
    });
}

export default winAnime;
