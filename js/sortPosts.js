// https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9

function setOrder(posts) {
    return new Promise((resolve) => {
        posts = posts.sort(function(a, b){
            return b['upvotes'] - a['upvotes'];
        });

        return resolve(posts)
    })
}