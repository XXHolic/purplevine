import React, {lazy,Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from 'components/container'

const Login = lazy(() => import('pages/login'));
const Home = lazy(() => import('pages/home'));
const Project = lazy(() => import('pages/project'));

function Router() {
  return (
    <BrowserRouter>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/project" component={Project}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </Suspense>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
