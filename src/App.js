import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthProvider from "./contexts/authContext/authProvider";
import AuthRedirect from "./pages/Auth/AuthRedirect";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/auth-redirect">
            <AuthRedirect />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
