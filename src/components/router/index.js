import React, {lazy,Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;