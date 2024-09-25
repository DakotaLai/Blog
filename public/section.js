const fullUrl = window.location.href;
const lastSeg = fullUrl.split("/").pop();
console.log(lastSeg);


document.addEventListener("DOMContentLoaded", function () {
    // console.log("ABC");
    const articles = {
        "codeIpsum": ['/database/codeIpsum/code01.json',
            '/database/codeIpsum/code02.json',
            '/database/codeIpsum/code03.json',
            '/database/codeIpsum/code04.json'],
        "catIpsum": [
            '/database/catIpsum/cat01.json',
            '/database/catIpsum/cat02.json',
            '/database/catIpsum/cat03.json',
            '/database/catIpsum/cat04.json',
        ],
        "cakeIpsum": [
            '/database/cakeIpsum/cake01.json',
            '/database/cakeIpsum/cake02.json',
            '/database/cakeIpsum/cake03.json',
        ]
    }
    var date = new Date().toJSON().slice(0, 10);

    const files = articles[lastSeg];
    console.log(files)
    Promise.all(files.map(file => fetch(file).then(response => response.json())))
        .then(data => {
            const dataDisplay = document.getElementById("data-display");
            data.map(element => {
                if (element.date.length != 0) {
                    date = element.date
                }
                const card = document.createElement("div");
                card.classList.add("card");
                card.style.width = "100%";
                card.innerHTML = `
                <div class="d-flex justify-content-between" id="data-display">
                    <div class="card-body">
                        <h3 class="card-title">${element.title}</h3>
                        <hr>
                        <div class="mt-3">
                        <form action="/${element.id}" method="POST" class="card-link" data-id=${element.id} >
                        <input type="hidden" name="articleId" value="${element.id}">
                       
                            <input type="submit" class="view-article btn btn-dark" value="View Article">
                       
                    </form>
                    </div>
                    </div>
                    <div class="card-footer d-none d-sm-block d-md-block d-xl-block d-lg-block"> 
                        <p class="card-author" id="card-author">By: ${element.author}</p> 
                    <p class="card-date"> Date: ${date}</p> 
                    </div>
                </div>`

                dataDisplay.appendChild(card)
            })

        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
