function fetchReddit(subReddits) {
    let posts = []
    subReddits.forEach(sub => {
        subURL = `https://khl-reddit-cors.herokuapp.com/https://reddit.com/r/${sub}.json`
        console.log(`Fetching ${subURL}`)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', subURL, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            let subPosts = xhr.response['data']['children']
            console.log(subPosts)
        }
        };
        xhr.send();
    });
}