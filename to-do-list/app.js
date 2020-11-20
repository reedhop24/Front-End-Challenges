window.addEventListener('load', () => {
    let container = document.getElementById('todo-container');
    let newButton = document.getElementById('add-div');

    container.addEventListener('click', (ev) => {
        if(ev.target.tagName === 'INPUT') {
            ev.target.parentElement.children[1].style['text-decoration'] = ev.target.parentElement.children[1].style['text-decoration'] === 'line-through' ? 'none' : 'line-through';
        } else if(ev.target.tagName === 'I') {
            container.removeChild(document.getElementById(ev.target.parentElement.id));
        }
    });

    newButton.addEventListener('click', () => {
        let newContent = document.getElementById('new-div');
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<input type="checkbox">
                                <p>${newContent.value}</p>
                            <i class="fa fa-close delete" style="font-size:24px;color:red;"></i>`
        newDiv.id = 'div-'+container.childElementCount+1;
        newDiv.className = 'todo-div'
        container.appendChild(newDiv);
    });
});