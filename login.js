const login=()=>{
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        let k = JSON.parse(xhr.response);
        openModal({
        "error" : "Ошибка",
        "success" : "Успешно"
    }[k.status], `<p>${k.message}</p> ${{
        "error": "<button>Ок</button>",
        "success": "<button onclick='location=\"/admin.html\"'>Продолжить</button>"
    }[k.status]}`)}
    xhr.open('POST', '/api/user/login');
    xhr.send(JSON.stringify({
        username: userName.value,
        password: passWord.value
    }));
    }