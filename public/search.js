// WHen you starttyping in the search box
function filter() {
    // Get the search term
    let text = document.getElementById("location").value;
    // But don't use it until we have enough letters
    if (text.length < 3) {
        // Also make sure the suggestions and count buckets are empty and the button is disabled
        document.getElementById("suggestions").innerHTML = "";
        document.getElementById("count").innerHTML = "";
        document.getElementById("Submit").disabled = true;
    }
    // Now we have enough letters
    if (text.length > 2) {
        // Talk to the server, send it a request with a parameter
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:6969/automagical/${text}`);
        xhr.send();
        // When it gets back
        xhr.onreadystatechange = () => {
            // And it's good
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                // Parse the response into JSON
                let responseData = JSON.parse(xhr.responseText)
                // Sort alphabetically (I'm guessing this is a basic insertion sort?)
                    .sort((a, b) => a.name.localeCompare(b.name));
                // Empty out the suggestions and count buckets and disable the button
                document.getElementById("suggestions").innerHTML = "";
                document.getElementById("count").innerHTML = "";
                document.getElementById("Submit").disabled = true;
                // Now fill them back up
                responseData.some((element, index) => {
                    // It's just a bunch of links with some information preloaded for setting the form
                    document.getElementById("suggestions").innerHTML += `
                    <a href="#" id="${element.id}" onclick="set(this)">
                        <span>${element.name}, ${element.state} ${element.country}</span>
                    </a>`
                    // Show a count of results
                    document.getElementById("count").innerText = `${index + 1} of ${responseData.length}`
                    // Only show ten results
                    return index >= 9;
                });
            } else {
                // Or it's bad
                console.log(`${xhr.status}: ${xhr.responseText}`);
            }
        }
    }
}
// When you select a location
function set(link) {
    // Set the hidden field to the ID of the link
    document.getElementById("refIndex").value = link.id;
    // Move the text from the link to the search box
    document.getElementById("location").value = document.getElementById(link.id).childNodes[1].innerText;
    // Enable the button
    document.getElementById("Submit").disabled = false;
    // Empty the suggestion and count buckets
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("count").innerHTML = "";
}

// 




