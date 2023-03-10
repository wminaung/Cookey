class Cookey {
    constructor(key, value, date, hour, path) {
        this.key = "";
        this.value = "";
        this.date = new Date();
        this.hour = 0;
        this.path = "";
        if (key === undefined ||
            value === undefined ||
            date === undefined ||
            hour === undefined ||
            path === undefined) {
            return;
        }
        this.key = key;
        this.value = value;
        this.date = date;
        this.hour = hour;
        this.path = path;
        const cookieString = Cookey.createCookieString(key, value, date, hour, path);
        this.setCookie = cookieString;
    }
    set setCookie(cookieString) {
        document.cookie = cookieString;
    }
    static get getCookie() {
        if (document.cookie === "")
            throw new Error("There is no Cookie");
        let data = document.cookie.split("; ");
        if (data.length <= 0) {
            throw new Error("There is no Cookie");
        }
        if (data === undefined)
            throw new Error("undifined Cookie");
        const cookieAry = data.map((d) => {
            const [key, value] = d.split("=");
            return { key, value };
        });
        return cookieAry;
    }
    static hasCookieKey(key) {
        if (!Array.isArray(Cookey.getCookieKeys))
            throw new Error("Cookey.getCookieKeys must be Array");
        return Cookey.getCookieKeys.includes(key);
    }
    static getCookieValue(key) {
        var _a;
        if (!Array.isArray(Cookey.getCookie)) {
            throw new Error("Cookey.getCookie must be Array");
        }
        const cookieAry = Cookey.getCookie;
        if (cookieAry.length <= 0) {
            throw new Error("There is no Cookie");
        }
        return (_a = cookieAry.filter((cookieObj) => cookieObj.key == key)[0]) === null || _a === void 0 ? void 0 : _a.value;
    }
    static get getCookieKeys() {
        let cookieAry = Cookey.getCookie;
        if (!Array.isArray(cookieAry)) {
            throw new Error("cookieAry must be Array");
        }
        if (cookieAry.length <= 0)
            throw new Error("There is no Cookie");
        return cookieAry.map((cookieObj) => cookieObj.key);
    }
    static deleteCookie(key, path = "/") {
        const expireDate = new Date(0).toUTCString();
        if (typeof key === "string") {
            document.cookie = `${key}=; expires=${expireDate}; path=${path}`;
        }
        if (Array.isArray(key)) {
            key.forEach((k) => (document.cookie = `${k}=; expires=${expireDate}; path=${path}`));
        }
    }
    static createCookieString(key, value, date, hour, path = "/") {
        let ms = 3600 * 1000 * hour;
        let currentMs = date.getTime();
        const msDate = date.setTime(currentMs + ms);
        const expireDate = new Date(msDate).toUTCString();
        const cookieString = `${key}=${value}; expires=${expireDate}; path=${path}`;
        return cookieString;
    }
}
export default Cookey;
