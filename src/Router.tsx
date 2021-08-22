import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Landing from "./pages/Landing";
import PageNotFound from "./pages/PageNotFound";
import Example from "./pages/Example";

const ClientRouter = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/" component={Example} />
        <Route component={PageNotFound} exact />
      </Switch>
    </Router>
  );
};
export default ClientRouter;
