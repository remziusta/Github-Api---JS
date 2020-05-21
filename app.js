//Selected ELements
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");

const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListener();

function eventListener() {
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearch);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}



function getData(e) {
    let username = nameInput.value.trim();

    if (username === ""){
        alert("Lütfen geçerli bir kullanıcı adı girin...");
    }else{
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found"){
                    ui.showError("Kullanıcı Bulunamadı");
                }else{
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err));
    }

    ui.clearInput();//Input temizleme

    e.preventDefault();
}

function clearAllSearch() {
    //Tüm arananları temizle
    if (confirm("Tüm arananları temizlemek ister misiniz?")){
        Storage.clearAllSearchedUsersFromStorage(); //Storage'dan temizler
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched() {
    //Arananları Storagedan al ve Ui'ye ekle

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML = result;

}
