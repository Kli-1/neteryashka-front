const logOut = ()=>{
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    location.reload();
}
const loadMore = async ()=>{
    loadingSet();
    let k = await fetch("/api/admin/item-codes/get-all", {
        "credentials": "same-origin"
    }).then(res=>res.json()).catch(()=>{
        openModal('Ошибка',`<p>Произошла ошибка на сервере. Обратитесь к создателям</p>`)
    });
    modalClose();
    addHere.innerHTML=``;
    try{
    k.forEach((row, itemId)=>{
        addHere.innerHTML += `<div class="row"><div class="cell">${row.code}</div><div class="cell">${[row.name,row.last_name, row.patronymic || ""].join(" ")}</div>
        <div class="cell">${row.email && "Почта: "+"<a href='mailto:"+row.email+"'>"+row.email+"</a>"}</br>${row.phone && "Телефон: "+"<a href='tel:"+row.phone+"'>"+row.phone+"</a>"}</div></div>`;
    });
    }
    catch (e){
        if (k===undefined){
            location = '/login.html'
        }
    }
}
document.addEventListener("DOMContentLoaded", loadMore);