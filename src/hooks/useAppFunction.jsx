import useAppState from "./useAppState";

export const useAppFunction = () => {
  const { setAppAlert, setAppLoading } = useAppState();

  const handleAlert = (alert, type, msg) => {
    setAppAlert({
      alert: alert || false,
      type: type || "success",
      msg: msg || "this is test message",
    });
  };

  const handleLoader = (load, color) => {
    console.log(`🚀 ~ file: useAppFunction.jsx:15 ~ load, color:`, load, color);
    setAppLoading({
      load: load || true,
      color: color || "#fff",
    });
    setTimeout(() => {
      setAppLoading({
        load: false,
      });
    }, 2000);
  };
  return { handleAlert, handleLoader };
};

export default useAppFunction;
