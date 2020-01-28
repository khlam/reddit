// Strips reddit JSON
function cleanData(redditResponse) {
    return new Promise((resolve) => {
        let cleaned = []
        redditResponse.forEach(post => {
            post = {
                'rank': null,
                'title': post['data']['title'],
                'author': post['data']['author'],
                'subreddit': post['data']['subreddit'],
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
async function getPosts(sub) {
    return await new Promise((resolve) => {
        subURL = `https://khl-reddit-cors.herokuapp.com/https://reddit.com/r/${sub}.json` // my personal cors-anywhere deployment https://github.com/khlam/cors-anywhere
        console.log(`Fetching ${subURL}`)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', subURL, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status === 200) {
                console.log(`${sub} retrieved`)
                let response = xhr.response['data']['children']
                console.log(response)
                return resolve(response)
            }
        };
        xhr.send();
    })
}

// Main function
function main(subReddits) {
    if (subReddits.length !== 0) {
        let posts = []
        subReddits.forEach((sub, index, array) => {
            getPosts(sub).then(resolvedPosts => {
                cleanData(resolvedPosts).then( cleaned => {
                    posts.push(cleaned)
                    console.log(posts.flat())
                })
            })
        })
    }
    
}

