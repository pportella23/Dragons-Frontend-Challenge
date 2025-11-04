import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DragonsListPage from "./pages/DragonListPage";
// import DragonDetailsPage from "./pages/DragonDetailsPage";
// import DragonFormPage from "./pages/DragonFormPage";
// import NotFoundPage from "./pages/NotFoundPage";
import { PrivateRoute } from "./components/layout/PrivateRoute";

function App() {
  return (
    <div className="AppLayout">
      <main>
        <Routes>
          {/* Rota de Login (Pública) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas Protegidas (Todas dentro do PrivateRoute) */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DragonsListPage />} />
            <Route path="/dragons" element={<DragonsListPage />} />
            {/* <Route path="/dragons/create" element={<DragonFormPage />} />
            <Route path="/dragons/:id" element={<DragonDetailsPage />} /> */}
            <Route
              path="/dragons/edit/:id"
              // element={<DragonFormPage editMode={true} />}
            />
          </Route>

          {/* Rota 404 para qualquer caminho não encontrado */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>

      {/* footer */}
    </div>
  );
}

export default App;
