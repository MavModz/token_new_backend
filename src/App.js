import "./App.css";
import Login from "./routes/Login/index";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true} autoDismissTimeout="2000">
        <Login />
      </ToastProvider>
    </Provider>
  );
}

export default App;
