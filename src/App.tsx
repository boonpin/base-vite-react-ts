import { Provider } from "react-redux";

import "@/src/styles/app.less";

import configureStore from "./redux/store";
import { AppStartup } from "@/src/app/startup.tsx";

const store = configureStore();

const App = () => {

    return (
        <Provider store={store}>
            <AppStartup/>
        </Provider>
    );
};

export default App;
