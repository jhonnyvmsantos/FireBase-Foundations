// LISTAGEM DO CONTEÚDO DO LIVRO --------------------------------------------------------------------------------------

const listBook = document.querySelector('#book_list')

function renderBook(doc) {
    let dataBook = doc.data()
    dataBook = {...dataBook, id: doc.id}
    console.log(dataBook)

    // CRIAÇÃO DOS ELEMENTOS HTML
    let li = document.createElement('li')
    let title = document.createElement('span')
    let author = document.createElement('span')

    //CARREGA OS DADOS NOS ELEMENTOS
    li.setAttribute('data-id', dataBook.id)
    title.textContent = dataBook.title
    author.textContent = dataBook.author

    //ADICIONANDO OS DADOS NA TAG li
    li.appendChild(title)
    li.appendChild(author)

    //ADICIONANDO A TAG li NA TAG ul
    listBook.appendChild(li)
}

db.collection("Libri-FireStore").get()
    .then((snapshot) => { //snapshot = response (Irá gravar os dados recebidos pelo get)
        // console.log(snapshot.docs)
        snapshot.docs.forEach(doc => {
            // console.log(doc.data()) //A função "data" traz os dados direto, sem adentrar local/local dentro do objeto
            renderBook(doc)
        });
    })

// CADASTRO DO LIVRO -----------------------------------------------------------------------------------------------------

const formBook = document.querySelector("#book_form")

formBook.addEventListener('submit', (e) => {
    e.preventDefault()

    db.collection("Libri-FireStore").add({
        title: formBook.form_title.value,
        author: formBook.form_author.value
    }).then(() => {
        formBook.form_title.value = ""
        formBook.form_author.value = ""
        window.location.reload()
    })
})