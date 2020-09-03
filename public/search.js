function filter() {
    let text = document.querySelector("#location").value;
    if (text.length < 3) {
        document.querySelector("#suggestions").innerHTML = "";
    }
    if (text.length > 2) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:6969/automagical/${text}`);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                let responseData = JSON.parse(xhr.responseText);
                document.querySelector("#suggestions").innerHTML = "";
                responseData.forEach(element => {
                    document.querySelector("#suggestions").innerHTML += `
                    <a href="#" id="${element.id}" onclick="set(this)">
                        <span>${element.name}, ${element.state} ${element.country}<span>
                    </a>`
                });
            }
        }
    }
}




