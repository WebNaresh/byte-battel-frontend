import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UseEffectState>
          <TopLoadingBar />
          <AppLoader />
          <AppAlert />
          <TopNav />
          <Toaster />
          <div style={{ height: "100%", width: "100%", marginTop: "80px" }}>
            <Route />
          </div>
        </UseEffectState>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
