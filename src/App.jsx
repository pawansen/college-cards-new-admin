import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store";
import router from 'routes';
// -----------------------|| APP ||-----------------------//
export default function App() {
  return <Provider store={ store }>
    <RouterProvider router={ router } />
    <ToastContainer position="top-right" autoClose={ 2000 } />
  </Provider>;
}
