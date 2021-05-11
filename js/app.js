'use strict'


//variables
const bold = document.querySelector('#bold');
const italic = document.querySelector('#italic');
const list = document.querySelector('#list');
const newPage = document.querySelector('#new-page');
const openPage = document.querySelector('#open-page');
const deletePage = document.querySelector('#delete-page');
const save = document.querySelector('#save');
const page = document.querySelector('#page');
const options = document.querySelectorAll('.option');


//save my current work in local storage
onkeyup = function() {
    localStorage.setItem('myCurrentWork', JSON.stringify(page.innerHTML))
}
window.onload = function(){
    const giveMeMyWork = JSON.parse(window.localStorage.getItem('myCurrentWork'));
    page.innerHTML = giveMeMyWork;
}


//txt options
bold.onclick = function makeBold(){
    document.execCommand('bold', false, null);
};

italic.onclick = function makeItalic(){
    document.execCommand('italic', false, null);
};

list.onclick = function makeList(){
    document.execCommand("insertUnorderedList", false, null);
};


//document options
newPage.onclick = function makeNewPage(){
    if (page.innerHTML == null || page.innerHTML == ''){
        alert('The page is already clear');
    }
    else{
        let k = confirm('Is this document saved?');
        if(k == true){
            page.innerHTML = '';
        }
        else{
            return false;
        }
    }   
};

openPage.onclick = function makeOpenPage(){
    let data = JSON.parse(localStorage.getItem("dataBase"));
    if(data == null || data.length == 0){
        alert('There are no documents');
    }
    else {
        const createModalBg = document.createElement('div');
        let modalBg = document.body.appendChild(createModalBg);
        modalBg.classList.add('modal-bg');

        const createModal = document.createElement('div');
        let modal = modalBg.appendChild(createModal);
        modal.classList.add('modal');

        for(let i in data){
            const createDivForDoc = document.createElement('div');
            let divForDoc = modal.appendChild(createDivForDoc);
            divForDoc.classList.add('div-for-doc');

            const createShowDate = document.createElement('p');
            let showDate = divForDoc.appendChild(createShowDate);
            showDate.classList.add('show-date');
            showDate.innerHTML = data[i].date;
            //open document and close modal
            divForDoc.onclick = function(){
                modalBg.style.display = 'none';
                page.innerHTML = '';
                page.innerHTML = data[i].content;

                localStorage.setItem('myCurrentWork', JSON.stringify(page.innerHTML))

            }
            //close modal
            window.onclick = function closeModal (event) {
                if (event.target == modalBg) {
                    modalBg.style.display = 'none';
                }
            }
        }
    }

};

deletePage.onclick = function makeDeletePage(){
    let j = confirm('Are you sure you want to delete all saved documents?');
    if (j == true){
        JSON.parse(localStorage.getItem("dataBase"));
        localStorage.setItem("dataBase", JSON.stringify([]));
    }
    else{
        return false;
    }
};

function savingToLokalStorage(){
    let dataBase = JSON.parse(localStorage.getItem("dataBase"));
    save.onclick = function makeSave(){
        if (page.innerHTML == null || page.innerHTML == ''){
            alert('Your document is empty');
        }
        else {
            let today = new Date();
            let dateNow = today.getFullYear()+ '-' + (today.getMonth()+1)+ '-' + today.getDate()+ ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
            const newDocument =
            {
                date: dateNow,
                content: page.innerHTML
            }

            dataBase = JSON.parse(localStorage.getItem("dataBase"));
            dataBase.push(newDocument);
            localStorage.setItem("dataBase", JSON.stringify(dataBase));
        }
    }
    if (dataBase == null || dataBase.length == 0){
        localStorage.setItem("dataBase", JSON.stringify([]));
    }
};

savingToLokalStorage();