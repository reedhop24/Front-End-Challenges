window.addEventListener('load', () => {
    let elems = ['Element1', 'Element2', 'Element3', 'Element4', 'Element5', 'Element6', 'Element7', 'Element8', 'Element9'];
    let initElems = [...elems];
    let main = document.getElementById('container');
    let p1 = 0;
    let p2 = 4;

    initElems = initElems.splice(p1, p2+1);
    for(let i = 0; i < initElems.length; i++) {
        let currElem = document.createElement('div');
        if(i === 1 || i === 3) {
            currElem.className = 'elem outer-two';
        } else if(i === 2) {
            currElem.className = 'elem middle';
        } else {
            currElem.className = 'elem';
        }
        currElem.innerHTML = `<h3>${initElems[i]}</h3>` 
        main.append(currElem);
    }

    let arrowLeft = document.getElementById('arrow-left');
    let arrowRight = document.getElementById('arrow-right');
    arrowLeft.addEventListener('click', () => {
        p1 === elems.length - 1 ? p1 = 0 : p1 += 1;
        p2 === elems.length - 1 ? p2 = 0 : p2 += 1;

        initElems.shift();
        initElems.push(elems[p2]);
        main.innerHTML = '';

        for(let i = 0; i < initElems.length; i++) {
            let currElem = document.createElement('div');
            currElem.className = 'elem';
            if(i === 1 || i === 3) {
                currElem.className = 'elem outer-two';
            } else if(i === 2) {
                currElem.className = 'elem middle';
            } else {
                currElem.className = 'elem';
            }
            currElem.innerHTML = `<h3>${initElems[i]}</h3>`;
            main.append(currElem);
        }
    });

    arrowRight.addEventListener('click', () => {
        p1 === 0 ? p1 = elems.length - 1 : p1 -= 1;
        p2 === 0 ? p2 = elems.length - 1 : p2 -= 1;

        initElems.pop();
        initElems.unshift(elems[p1]);
        main.innerHTML = '';

        for(let i = 0; i < initElems.length; i++) {
            let currElem = document.createElement('div');
            currElem.className = 'elem';
            if(i === 1 || i === 3) {
                currElem.className = 'elem outer-two';
            } else if(i === 2) {
                currElem.className = 'elem middle';
            } else {
                currElem.className = 'elem';
            }
            currElem.innerHTML = `<h3>${initElems[i]}</h3>`;
            main.append(currElem);
        }
    });
});