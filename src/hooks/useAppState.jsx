import create from "zustand";

const useAppState = create((set) => ({
  appAlert: {
    alert: true,
    type: "success",
    msg: "this is success alert",
  },
  user: null,
  setAppAlert: (newAlert) => set({ appAlert: { ...newAlert } }),
  appLoading: {
    load: false,
    color: "#fff",
  },
  setAppLoading: (newLoading) => set({ appLoading: { ...newLoading } }),
  progress: 10,
  setProgress: (newProgress) => set({ progress: newProgress }),
  setUser: (user) => set({ user }),
}));

export default useAppState;
