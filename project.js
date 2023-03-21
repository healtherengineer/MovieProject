const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const clearButton = document.querySelector("#clear-films");

//UI başlatma


const cardBody = document.querySelectorAll(".card-body")[1];
//Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded",UI.loadAllFilms(Storage.getFilmsFromStorage()));

    cardBody.addEventListener("click",deleteFilm);
    clearButton.addEventListener("click",clearFilms);
    //ui.getFilmsFromStorage(storage.getFilmsFromStorage());
}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //hata
        UI.displayMessages("Tüm Alanları doldurmanız gerekli ...","danger");
    }
    else{

        const newFilm = new Film(title,director,url);
        UI.addFilmToUI(newFilm); //Arayüze film ekleme

        Storage.addFilmToStorage(newFilm); //Storage a ekle

        UI.displayMessages(newFilm.title + " başarı ile eklendi... :)" , "success")


    }

    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();

}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı...", "success");
    }
}
function clearFilms(){

    if(confirm("Silmek istediğinize emin misiniz ?")){
        UI.clearFilmsFromUI();
        Storage.clearFilmsFromStorage();
        UI.displayMessages("Tüm filmler temizlendi","success");
    }
   

}