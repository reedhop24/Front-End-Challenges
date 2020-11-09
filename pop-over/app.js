window.addEventListener('load', (event) => {
    let popButton = document.getElementById('pop-button');
    popButton.addEventListener('click', () => {
        let popOver = document.getElementById('pop-over')
        popOver.style.visibility = 'visible';
    });
    let closeButton = document.getElementById('close')
    closeButton.addEventListener('click', () => {
        let popOver = document.getElementById('pop-over');
        popOver.style.visibility = 'hidden';
    })
});