import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Route from "./Route";
import UseEffectState from "./lib/globalUseEffect";
import AppAlert from "./utils/AppAlert/AppAlert";
import AppLoader from "./utils/AppLoader/AppLoader";
import TopLoadingBar from "./utils/TopLoadingBar/TopLoadingBar";
import TopNav from "./utils/TopNav/TopNav";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#f97316", // Change this to your desired primary color
        text: "white", // Change this to your desired primary color
      },
    },
  });
  const param = useLocation();
  console.log(`🚀 ~ file: App.jsx:25 ~ param:`, param);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UseEffectState>
        <TopLoadingBar />
        <AppLoader />
        <AppAlert />
        <TopNav />
        <Toaster />
        <div
          style={{
            height: "100%",
            width: "100%",
            marginTop: param.pathname === "/" ? 0 : 80,
          }}
        >
          <Route />
        </div>
      </UseEffectState>
    </ThemeProvider>
  );
}

export default App;
