document.addEventListener("DOMContentLoaded", function () {
    // console.log("ABC");

    var date = new Date().toJSON().slice(0, 10);
    const files = [
        '/database/codeIpsum/article1',
        '/database/codeIpsum/article2',
        '/database/codeIpsum/article3',
        '/database/codeIpsum/article4',
    ];
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
                        <form action="/${element.id}" method="POST" class="card-link" data-id=${element.id} >
                        <input type="hidden" name="articleId" value="${element.id}">
                        <input type="submit" class="view-article btn btn-dark" value="View Article">
                    </form>
                    </div>
                    <div class="card-footer"> 
                        <p class="card-author" id="card-author">By: ${element.author}</p> 
                    <p class="card-date"> Date: ${date}</p> 
                    </div>
                </div>`

                dataDisplay.appendChild(card)
            })

        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
