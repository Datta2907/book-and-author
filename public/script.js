// Fetch authors for the upload form
if (document.getElementById("authorSelect")) {
    fetch('/authors')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("authorSelect");
            data.forEach(author => {
                let option = document.createElement("option");
                option.value = author._id;
                option.textContent = author.name;
                select.appendChild(option);
            });
        });
}

// Handle book upload
if (document.getElementById("uploadForm")) {
    document.getElementById("uploadForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('/books', {
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(() => window.location.href = "/list");
    });
}

// Fetch books and authors for the list page
if (document.getElementById("book-list")) {
    fetch('/books-and-authors')
        .then(response => response.json())
        .then(data => {
            let bookList = document.getElementById('book-list');
            data.forEach(book => {
                let li = document.createElement('li');
                li.innerHTML = `<b>Title:</b> ${book.title} <br>
                                <b>Pages:</b> ${book.pages} <br>
                                <b>Author:</b> ${book.author.name} <br>
                                <b>Book Published Date:</b> ${book.publishedDate.substring(0, 10)} <br>
                                <b>Author Nationality:</b> ${book.author.nationality} <br>
                                <b>Author Age:</b> ${book.author.age} <br>
                                <b>Author Birthday:</b> ${book.author.birthdate.substring(0, 10)} <hr>`;
                bookList.appendChild(li);
            });
        });
}

// Query books based on number of pages
function queryBooks() {
    const pages = document.getElementById("pageQuery").value;
    fetch(`/min-books?pages=${pages}`)
        .then(response => response.json())
        .then(data => {
            let list = document.getElementById("results");
            list.innerHTML = "";
            data.forEach(book => {
                let item = document.createElement("li");
                item.innerHTML = `<b>Title:</b> ${book.title} <br>
                                  <b>Pages:</b> ${book.pages} <br>
                                  <b>Author:</b> ${book.author.name} <hr>`;
                list.appendChild(item);
            });
        });
}

// Query books based on age of authors
function queryBooks() {
    const pages = document.getElementById("pageQuery").value;
    fetch(`/min-books?pages=${pages}`)
        .then(response => response.json())
        .then(data => {
            let list = document.getElementById("results");
            list.innerHTML = "";
            data.forEach(book => {
                let item = document.createElement("li");
                item.innerHTML = `<b>Title:</b> ${book.title} <br>
                                  <b>Pages:</b> ${book.pages} <br>
                                  <b>Author:</b> ${book.author.name} <hr>`;
                list.appendChild(item);
            });
        });
}