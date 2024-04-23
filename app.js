// LISTAGEM DO CONTEÚDO DO LIVRO --------------------------------------------------------------------------------------

const listBook = document.querySelector('#book_list')

function renderBook(doc) {
    let dataBook = doc.data()
    // dataBook = {...dataBook, id: doc.id}
    // console.log(dataBook)

    // CRIAÇÃO DOS ELEMENTOS HTML
    let li = document.createElement('li')
    let title = document.createElement('span')
    let author = document.createElement('span')
    let exclude = document.createElement('div')

    //CARREGA OS DADOS NOS ELEMENTOS
    li.setAttribute('data-id', doc.id) //SETA UM ATRIBUTO QUE RECEBE O ID DO ITEM
    title.textContent = dataBook.title
    author.textContent = dataBook.author

    //ADICIONANDO OS DADOS NA TAG li
    li.appendChild(title)
    li.appendChild(author)
    li.appendChild(exclude)

    //ADICIONA UM TEXTO À DIV DE EXCLUSÃO
    exclude.textContent = 'X'

    //TRATAMENTO DO BOTÃO P/EXCLUIR DETERMINADO ITEM
    exclude.addEventListener('click', (event) => {
        event.stopPropagation() //EVITAR REPETIÇÃO SEM FIM DO EVENTO

        //RECUPERANDO VALOR DO ATRIBUTO ´data-id´ DO ELEMENTO 'PAI'
        let id = event.target.parentElement.getAttribute('data-id')

        //DELETANDO ELEMENTO DA "COLEÇÃO" PELO ID DO ELEMENTO
        db.collection("Libri-FireStore").doc(id).delete()
            .then(() => { window.location.reload() }) //RECARREGANDO A PAGINA P/VISUALIZAR A 'NOVA LISTAGEM'
    })

    //ADICIONANDO A TAG li NA TAG ul
    listBook.appendChild(li)
}

db.collection("Libri-FireStore").get()
    .then((snapshot) => { //snapshot = response (Irá gravar os dados recebidos pelo get)
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