window.addEventListener('load', () => {
    let allIssue = document.getElementById('issue-container');
    let newButton = document.getElementById('new-issue-button');

    allIssue.addEventListener('click', (e) => {
        let currContent = document.getElementById('content-'+e.target.id.split('-')[1]);
        if(currContent) {
            currContent.style.visibility === 'visible' ?  currContent.style.visibility = 'hidden' : currContent.style.visibility = 'visible';
            console.log(e.target);
            e.target.className === 'fas fa-angle-up' ? e.target.className = 'fas fa-angle-down' : e.target.className = 'fas fa-angle-up';
        }
    });

    newButton.addEventListener('click', () => {
        let newIssue = document.getElementById('new-issue-name').value;
        let newContent = document.getElementById('new-issue-content').value;
        let numIssues = (allIssue.childElementCount/2)+1;

        let newItemDiv = document.createElement('div');
        let newItemHead = document.createElement('h3');
        newItemHead.innerHTML = `${newIssue} <i class='fas fa-angle-down' id='issue-${numIssues}'>`;
        newItemDiv.appendChild(newItemHead);

        let newItemUl = document.createElement('ul');
        newItemUl.id = 'content-'+numIssues;
        newItemUl.style.visibility = 'hidden';
        newItemUl.innerHTML = `<li>${newContent}</li>`

        allIssue.appendChild(newItemDiv);
        allIssue.append(newItemUl)
    });
});