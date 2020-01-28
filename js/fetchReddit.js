// Strips reddit JSON
function cleanData(redditResponse) {
    return new Promise((resolve) => {
        let cleaned = []
        redditResponse.forEach(post => {
            post = {
                'title': post['data']['title'],
                'author': post['data']['author'],
                'commentsURL': `https://reddit.com${post['data']['permalink']}`,
                'commentsNumber': post['data']['num_comments'],
                'upvotes': post['data']['score'],
                'createdUTC': post['data']['created_utc'],
                'postDomain': post['data']['domain'],
                'postURL': post['data']['url'] 
            }
            cleaned.push(post)
        })
        return resolve(cleaned)
    })
}

// Fetches posts from reddit through my heroku-deployed cors-anywhere proxy for getting around the clickjacking protection
function getPosts(sub) {
    return new Promise((resolve) => {
        subURL = `https://khl-reddit-cors.herokuapp.com/https://reddit.com/r/${sub}.json` // my personal cors-anywhere deployment https://github.com/khlam/cors-anywhere
        console.log(`Fetching ${subURL}`)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', subURL, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status === 200) {
                console.log(`${sub} retrieved`)
                return resolve(xhr.response['data']['children'])
            }
        };
        xhr.send();
    })
}

function fetchReddit(subReddits) {
    return new Promise((resolve) => {
        let posts = []
        subReddits.forEach((sub, index, array) => {
            getPosts(sub).then(resolvedPosts => {
                cleanData(resolvedPosts).then( cleaned => {
                    posts.push(cleaned)
                })
            })
            if (index === array.length -1){
                console.log(index)
                console.log(array.length - 1 )
                resolve(posts)
            }
        })
    })
}

