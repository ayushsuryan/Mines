import { atom, selector } from "recoil";

const authTokenState = atom({
  key: "authTokenState",
  default: localStorage.getItem("token") || null,
});

const authState = selector({
  key: "authState",
  get: ({ get }) => {
    const token = get(authTokenState);
    return token ? { token } : null;
  },
  set: ({ set }, newValue) => {
    if (newValue) {
      localStorage.setItem("token", "Bearer " + newValue.token);
      set(authTokenState, newValue.token);
    } else {
      localStorage.removeItem("token");
      set(authTokenState, null);
    }
  },
});

export { authTokenState, authState };
