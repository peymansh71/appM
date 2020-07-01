import React from "react";
import Routes from "./Routes";
import { StoreProvider } from "./Store/Store";
import { ToastContainer, Zoom } from "react-toastify";

const initialValue = {
  name: "abbas",
};

function App() {
  return (
    <StoreProvider store={initialValue}>
      <ToastContainer
        position="top-right"
        containerId="2"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        limit={1}
        pauseOnFocusLoss
        draggable={false}
        transition={Zoom}
        enableMultiContainer={false}
        pauseOnHover
      />
      <Routes />
    </StoreProvider>
  );
}

export default App;
