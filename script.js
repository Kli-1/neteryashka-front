copyright.innerHTML=copyright.innerHTML.replace("2019", new Date().getFullYear());
const contact = ()=>{
    openModal("Связаться с нами", "<a href='mailto:neteryashka@bk.ru'>neteryashka@bk.ru</a><br/><a target='_blank' href='https://vk.com/neteryashka_asha'>Наш VK</a>");
}
const formReg = ()=>{
    openModal("Регистрация предмета", `
    <form onsubmit="regCode(); return false;">
        <div>
            <label><input id="code2" minlength="1" required placeholder="Код" value="${code.value}" maxlength="100" type="text" /><font color="red">*</font></label>
            <label><input id="namefy" minlength="2" required placeholder="Имя" pattern="[a-zA-zа-яА-я]{2,20}" type="text" /><font color="red">*</font></label>
        </div>
        <div>
            <label><input id="surnamefy" minlength="2" required placeholder="Фамилия" pattern="[a-zA-zа-яА-я]{2,20}" type="text" /><font color="red">*</font></label>
            <label><input id="patronymic" minlength="2" pattern="[a-zA-zа-яА-я]{2,20}" placeholder="Отчество" type="text" /></label>
        </div>
        <div>
            <label><input id="tel" minlength="2" inputmode="numeric" minlength="11" maxlength="11" placeholder="Телефон (без +)" type="text"/></label>
            <label><input id="mail" minlength="2" required placeholder="Почта" type="email"/><font color="red">*</font></label>
        </div>
        <small><input type="checkbox" required/> Я согласен с тем что мои персональные данные будут доступны людям, нашедшим предмет</small>
        <button>Зарегистрировать</button>
    </form>
    `);
}
const regCode = ()=>{
    console.log("xhr l");
    let XHR =new XMLHttpRequest();
    XHR.onload = ()=>{
    let d = JSON.parse(XHR.response);
        openModal({
            "success": "Успешно",
            "error": "Ошибка"
        }[d.status],d.message);
    }
    XHR.open("POST", "/api/user/item-codes/register");
    let debug = {
        "name": namefy.value,
        "code": code2.value,
        "last_name": surnamefy.value,
        "patronymic" : patronymic.value,
        "email": mail.value,
        "phone": tel.value
    };
    console.log(debug);
    XHR.send(JSON.stringify(debug));
}
const getCode = async (val)=>{
    let res = await fetch(`/api/user/item-codes/get?code=${val}`).then(res=>res.json());
    let resItems = [
        "Код",
        "Имя",
        "Фамилия",
        "Отчество",
        "Почта",
        "Телефон"
    ];
    let itemMarkup = '';
if (res.status=="success"){
    res.data.forEach((item,key)=>{
        [...(new Set(Object.values(item)))].forEach((itemRow,key2)=>{
            if(itemRow!="no"){
            console.log(key2, resItems[key2], item);
            itemMarkup+= `
            ${resItems[key2]}: ${itemRow}<br/>
            `;
        }
        });
    });
    }
    openModal({
        "success": "Успех",
        "error": "Ошибка"
    }[res.status], `<p>
        ${res.message}
    ${itemMarkup}</p>`);
}