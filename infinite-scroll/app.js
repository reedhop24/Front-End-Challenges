window.addEventListener('load', () => {
    let elemBody = document.getElementById('scroll');
    let elemCount = 0;
    while(document.body.offsetHeight < window.innerHeight-100) {
        let newElem = document.createElement('div')
        newElem.innerHTML = '<h3>Elem</h3>';
        newElem.className = "elem";
        newElem.id = elemCount;
        elemCount++;
        elemBody.appendChild(newElem);
    }
    let scroll = document.createElement('div');
    scroll.id = "new-elems";
    scroll.className = "elem"
    scroll.innerHTML = '<h3>Scroll To load more Content</h3>'
    elemBody.appendChild(scroll);
    window.onscroll = (ev) => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            let lastChild = document.getElementById((elemCount-1).toString());
            let newElem = document.createElement('div');
            newElem.innerHTML = '<h3>Elem</h3>';
            newElem.id = elemCount;
            newElem.className = "elem";
            lastChild.after(newElem);
            elemCount++;
        }
    }
});