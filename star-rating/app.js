let numStar = document.getElementById('star-num')
numStar.addEventListener('input', () => {
    let starVal = numStar.value;
    let container = document.getElementById('container');
    container.innerHTML = '';
    for(let i = 0; i < starVal; i++) {
        let star = document.createElement('i');
        star.className = 'far fa-star';
        star.id = i;
        container.appendChild(star);
    }
    container.addEventListener('mouseover', (ev) => {
        let targetId =  ev.target;
        if(targetId.className === 'far fa-star') {
            for(let i = 0; i <= targetId.id; i++) {
                let currStar = document.getElementById(i);
                currStar.className = 'far fa-star gold';
            }
        }
    });
    container.addEventListener('mouseout', () => {
        let star = document.getElementsByClassName('far fa-star');
        for(let i = 0; i < star.length; i++) {
            star[i].className = 'far fa-star'
        }
    })
});