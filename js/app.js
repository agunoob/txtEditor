'use strict'


//variables
const bold = document.querySelector('#bold');
const italic = document.querySelector('#italic');
const list = document.querySelector('#list');
const newPage = document.querySelector('#new-page');
const openPage = document.querySelector('#open-page');
const deletePage = document.querySelector('#delete-page');
const save = document.querySelector('#save');
const page = document.querySelector('#page')


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
    console.log('new page')
};

openPage.onclick = function makeOpenPage(){
    console.log('open page')
};

deletePage.onclick = function makeDeletePage(){
    console.log('delete')
};



let dataBase = JSON.parse(localStorage.getItem("dataBase"));
save.onclick = function makeSave(){
    if (page.innerHTML != null || page.innerHTML !=''){
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
    if (page.innerHTML == null || page.innerHTML ==''){
            alert('Your document is empty');
    }
}
if (dataBase == null || dataBase.length == 0){
    localStorage.setItem("dataBase", JSON.stringify([]));
}
