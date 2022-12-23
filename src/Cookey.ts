type CookieObj = {
  key: string;
  value: string;
};

class Cookey {
  private key: string = "";
  private value: string = "";
  private date: Date = new Date();
  private hour: number = 0;
  private path: string = "";

  constructor(
    key?: string | undefined,
    value?: string | undefined,
    date?: Date | undefined,
    hour?: number | undefined,
    path?: string | undefined
  ) {
    if (
      key === undefined ||
      value === undefined ||
      date === undefined ||
      hour === undefined ||
      path === undefined
    ) {
      return;
    }

    this.key = key;
    this.value = value;
    this.date = date;
    this.hour = hour;
    this.path = path;

    const cookieString: string = Cookey.createCookieString(
      key,
      value,
      date,
      hour,
      path
    );

    this.setCookie = cookieString;
  }

  set setCookie(cookieString: string) {
    document.cookie = cookieString;
  }

  static get getCookie(): CookieObj[] | Error {
    if (document.cookie === "") return new Error("There is no Cookie");
    let data: string[] = document.cookie.split("; ");
    if (data.length <= 0) {
      return new Error("There is no Cookie");
    }
    if (data === undefined) return new Error("undifined Cookie");

    const cookieAry: CookieObj[] = data.map((d) => {
      const [key, value] = d.split("=");
      return { key, value };
    });

    return cookieAry;
  }

  static hasCookieKey(key: string): boolean | Error {
    if (!Array.isArray(Cookey.getCookieKeys))
      return new Error("Cookey.getCookieKeys must be Array");

    return Cookey.getCookieKeys.includes(key);
  }

  static getCookieValue(key: string): string | Error {
    if (!Array.isArray(Cookey.getCookie)) {
      return new Error("Cookey.getCookie must be Array");
    }
    const cookieAry = Cookey.getCookie;
    if (cookieAry.length <= 0) {
      return new Error("There is no Cookie");
    }
    return cookieAry.filter((cookieObj: CookieObj) => cookieObj.key == key)[0]
      ?.value;
  }

  static get getCookieKeys(): string[] | Error {
    let cookieAry: CookieObj[] | Error = Cookey.getCookie;
    if (!Array.isArray(cookieAry)) {
      return new Error("cookieAry must be Array");
    }
    if (cookieAry.length <= 0) return new Error("There is no Cookie");
    return cookieAry.map((cookieObj) => cookieObj.key);
  }

  static deleteCookie(key: string | string[], path: string = "/") {
    const expireDate = new Date(0).toUTCString();
    if (typeof key === "string") {
      document.cookie = `${key}=; expires=${expireDate}; path=${path}`;
    }
    if (Array.isArray(key)) {
      key.forEach(
        (k) => (document.cookie = `${k}=; expires=${expireDate}; path=${path}`)
      );
    }
  }

  static createCookieString(
    key: string,
    value: string,
    date: Date,
    hour: number,
    path: string = "/"
  ): string {
    let ms = 3600 * 1000 * hour;
    let currentMs = date.getTime();
    const msDate = date.setTime(currentMs + ms);
    const expireDate = new Date(msDate).toUTCString();
    const cookieString = `${key}=${value}; expires=${expireDate}; path=${path}`;

    return cookieString;
  }

  //end class
}
