import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages//Home/Home";
import About from "./pages/About/About";
import NotificationConsumer from "./pages/Consumer-Notification/page";
import Consumer from "./pages/Consumer/page";
import Login from "./pages/Login/page";
import Notification from "./pages/Notification/page";
import Providers from "./pages/Provider/page";
import Signup from "./pages/Signup/page";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/providers" element={<Providers />} />
      <Route exact path="/consumers" element={<Consumer />} />
      <Route exact path="/notification" element={<Notification />} />
      <Route
        exact
        path="/notification-consumer"
        element={<NotificationConsumer />}
      />
    </Routes>
  );
};
export default App;
