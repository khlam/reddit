function stylePost(post) {
    return `
        <td>${post['upvotes']}</td>
        <td>.thumbnail</td>
        <td>
                <div class="row">
                    <div class="col-9">
                        <a href="${post['postURL']}">${post['title']}</a>
                    </div>
                    <div class="col-2">
                    (<a href="${post['postDomain']}">${post['postDomain']}</a>)
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                    submitted by <a href="https://old.reddit.com/u/${post['author']}">${post['author']}</a> to <a href="https://old.reddit.com/r/${post['subreddit']}">r/${post['subreddit']}</a>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                    <a href="${post['commentsURL']}">${post['commentsNumber']} comments</a>
                    </div>
                </div>
        </td>

        `
}

function createTable(allPosts) {
    console.log(allPosts)
    var result = "<table border=1>";
    allPosts.forEach(post => {
        result += "<tr>"
            //console.log(post)
            result += stylePost(post)

        result += "</tr>"
    });

    result += "</table>";
    document.getElementById("display").innerHTML = result
    //console.log(result)
    return result;
}