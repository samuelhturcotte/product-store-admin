import React from "react";
import { Routes, Route } from "react-router-dom";
import { BaseLayout } from "./layout/BaseLayout";
import { RequireAuth } from "./layout/RequireAuth";
import { RequireAnonym } from "./layout/RequireAnonym";
import { LoginPage } from "./pages/auth/LoginPage";
import { LoggedInLayout } from "./layout/LoggedInLayout";
import StoreComponent from "./product-store/product-store";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from "./product-details/product-details";
import EditDetails from "./edit-store/edit-store";



const auth = (component: React.ReactElement) => (
  <RequireAuth>
    <LoggedInLayout>{component}</LoggedInLayout>
  </RequireAuth>
);

const anon = (component: React.ReactElement) => (
  <RequireAnonym>{component}</RequireAnonym>
);

export default function App() {
  return (

    <div>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/login" element={anon(<LoginPage key="login"/>)} />
          <Route path="/" element={auth(<StoreComponent key="store"/>)} />
          <Route path="/details/:id" element={auth(<ProductDetails key="details"/>)} />
          <Route path="/edit/:id" element={auth(<EditDetails key="edit"/>)} />
          <Route path="/add" element={auth(<EditDetails key="add"/>)} />

        </Route>
      </Routes>

    </div>
    
  );
}
