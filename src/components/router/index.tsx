import Home from "@pages/home";
import { Route, Switch } from "react-router-dom";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
