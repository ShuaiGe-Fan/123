export const pathMap = {
  Login: "登录",
  Merchant: "商家管理",
  Application: "应用管理",
  Account: "修改账户",
};

export function localGet(key) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return value;
  }
}

export function localSet(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key) {
  window.localStorage.removeItem(key);
}
export function bankUp(key) {
  window.localStorage.removeItem(key);
}
