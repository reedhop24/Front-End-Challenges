window.addEventListener('load', () => {
    let content = document.getElementById('content');
    let navs = document.getElementById('nav-bar');
    navs.addEventListener('click', (event) => {
        let pageObj = {
            'Page1': '<h1>You are on page 1</h1>',
            'Page2': '<h1>You are on page 2</h1>',
            'Page3': '<h1>You are on page 3<h1/>'
        }
        if(event.target.href) {
            content.innerHTML = '';
            let currPage = event.target.href.split('#')[1];
            if(pageObj[currPage]) {
                let div = document.createElement('div');
                div.innerHTML = pageObj[currPage];
                content.appendChild(div);
            }
        }
    });
});
