// https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
function setRank(allPosts) {
    return new Promise((resolve) => {
        let currentDateUTC = Date.now()
        console.log(currentDateUTC)
        allPosts.forEach(post => {
            let t = currentDateUTC - post['createdUTC']
            let y = 0
            let z = 1
            if (post['upvotes'] > 0) {
                y = 1
                z = Math.abs(post['upvotes'])
            }else if (post['upvotes'] < 0) {
                y = -1
                z = 1
            }
            post['rank'] = ( Math.log10(z) + ((y*t)/45000) )
        });
        return resolve(allPosts)
    })
}

// Sets descending order, highest post first
function descendingOrder(posts) {
    return new Promise((resolve) => {
        posts = posts.sort(function(a, b){
            return b['upvotes'] - a['upvotes'];
        });

        return resolve(posts)
    })
}

function setOrder(posts) {
    return new Promise((resolve) => {
        setRank(posts).then(rankedPosts => {
            descendingOrder(rankedPosts).then(result => {
                return resolve(result)
            })
        })
    })
}