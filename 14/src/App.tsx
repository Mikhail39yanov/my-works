import React, { useEffect, useState } from "react";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./scss/main.global";
import "./scss/style";
import { hot } from "react-hot-loader/root";
import { Layout, Header, Content, CardsList, Post } from "./shared";
import { rootReduce } from "./store/reducer";
import { useToken } from "./hooks";
import { NotFound } from "./shared/NotFound/NotFound";
import { RecoilRoot } from "recoil";

const store = createStore(
  rootReduce,
  composeWithDevTools(applyMiddleware(thunk))
);

const AppComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useToken();

  return (
    <>
      {mounted && (
        <BrowserRouter>
          <Layout>
            <Header />
            <Content>
              <Switch>
                <Redirect exact from="/auth" to="/posts" />
                <Redirect exact from="/" to="/posts" />

                <Route exact strict path="/posts/post_:id/">
                  <Post />
                  <CardsList />
                </Route>

                <Route exact path="/posts">
                  <CardsList />
                </Route>

                <Route component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
};

export const App = hot(() => (
  <RecoilRoot>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </RecoilRoot>
));
// export const App = hot(AppComponent)
