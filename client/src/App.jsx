import { Fragment, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Toaster } from "react-hot-toast";
import LazyLoader from "./components/LazyLoader";
import ScreenLoader from "./components/ScreenLoader";
const MenuPage = lazy(() => import("./pages/MenuPage"));

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoader />}>
                <MenuPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <ScreenLoader />
      <Toaster position="top-center" />
    </Fragment>
  )
}

export default App
