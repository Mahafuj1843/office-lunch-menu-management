import { Fragment, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Toaster } from "react-hot-toast";
import LazyLoader from "./components/LazyLoader";
import ScreenLoader from "./components/ScreenLoader";

const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const MenuListPage = lazy(() => import("./pages/admin/MenuListPage"));
const CreateUpdateMenuPage = lazy(() => import("./pages/admin/CreateUpdateMenuPage"));

function App() {

  return ( 
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <Suspense fallback={<LazyLoader />}>
                <RegistrationPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LazyLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoader />}>
                <MenuPage />
              </Suspense>
            }
          />
          <Route
            path="/menuList"
            element={
              <Suspense fallback={<LazyLoader />}>
                <MenuListPage />
              </Suspense>
            }
          />
          <Route
            path="/createMenu"
            element={
              <Suspense fallback={<LazyLoader />}>
                <CreateUpdateMenuPage />
              </Suspense>
            }
          />
          <Route
            path="/updateMenu/:id"
            element={
              <Suspense fallback={<LazyLoader />}>
                <CreateUpdateMenuPage />
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
