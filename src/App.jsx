import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import UseEffectState from "./lib/UseEffect/UseEffectContext";
import Route from "./route";
import AppAlert from "./utils/AppAlert/AppAlert";
import AppLoader from "./utils/AppLoader/AppLoader";
import TopLoadingBar from "./utils/TopLoadingBar/TopLoadingBar";
import TopNav from "./utils/TopNav/TopNav";

function App() {
  return (
    <BrowserRouter>
      <UseEffectState>
        <TopLoadingBar />
        <AppLoader />
        <AppAlert />
        <TopNav />
        <div style={{ height: "100%", width: "100%" }}>
          <Route />
        </div>
      </UseEffectState>
    </BrowserRouter>
  );
}

export default App;
