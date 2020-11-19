window.addEventListener('load', () => {
    $('#search').on('click', () => {
        $('#giphy-body').empty();
        let input = $('input').val().split(' ').join('+');
        var xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=${input}&api_key=kneaFInFsqUohy2pATkictEvkXhqp5UE&limit=5`);
        xhr.done((data) => { 
            for(let i = 0; i < data.data.length; i++) {
                $('#giphy-body').append(`<div class="gif-div"><iframe src=${data.data[i].embed_url} class="i-frame" frameBorder="0"</iframe></div>`)
            } 
        });
    });
});