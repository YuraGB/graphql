let user = {
    name: "Вася",
    _password: "***"
};

user = new Proxy(user, {
    get(target, prop) {
        if (prop.startsWith("_")) {
            throw new Error("Отказано в доступе");
        } else {
            let value = target[prop];
            return typeof value === "function" ? value.bind(target) : value; // (*)
        }
    },
    set(target, prop, val) {
        // перехватываем запись свойства
        console.log(target, prop, val);
        if (prop.startsWith("_") && target[prop]) {
            throw new Error("Отказано в доступе");
        } else {
            target[prop] = val;
            return true;
        }
    },
    deleteProperty(target, prop) {
        // перехватываем удаление свойства
        if (prop.startsWith("_")) {
            throw new Error("Отказано в доступе");
        } else {
            delete target[prop];
            return true;
        }
    },
    ownKeys(target) {
        // перехватываем попытку итерации
        return Object.keys(target).filter(key => !key.startsWith("_"));
    }
});

user._name = "Vasya";
console.log(user);
delete user.name;
console.log(user)