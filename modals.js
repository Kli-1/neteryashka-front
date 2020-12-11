const modalRoot = document.querySelector(".modalRoot");
const modalClose = ()=>{
    modalRoot.innerHTML=``;
    modalRoot.className = `modalRoot inactive`;
}
const openModal = (header, contents)=>{
    modalRoot.innerHTML = `<div class="modal">
        <span class="close" onclick="modalClose()">&#10005;</span>
        <h2>${header}</h2>
        ${contents}
    </div>`;
    modalRoot.className = `modalRoot`;
}
const loadingSet = ()=>{
    modalRoot.className = `modalRoot`;
    modalRoot.innerHTML = `
    <div class="await">Загрузка...</div>`
}