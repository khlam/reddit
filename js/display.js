function createTable(allPosts) {
    console.log(allPosts)
    var result = "<table border=1>";
    allPosts.forEach(post => {
        result += "<tr>"
            //console.log(post)
            Object.keys(post).forEach(function(key) {
                //console.log(key, obj[key]);
                result += "<td>"+post[key]+"</td>";
            });

        result += "</tr>"
    });

    result += "</table>";
    document.getElementById("display").innerHTML = result
    //console.log(result)
    return result;
}