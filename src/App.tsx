import { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary as ErrorBoundaryContainer } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "./Common/Features";
import { LayoutDefault } from "./Common/Layout";
import CommonRoutes from "./App/Routers/CommonRoutes";
import { store } from "./App/store";

const App = () => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundaryContainer FallbackComponent={ErrorBoundary}>
          <Suspense>
            <BrowserRouter>
              <LayoutDefault>
                <CommonRoutes />
              </LayoutDefault>
              {/* <AxiosProvider /> */}
            </BrowserRouter>
          </Suspense>
        </ErrorBoundaryContainer>
      </HelmetProvider>
    </Provider>
  );
};

export default App;
