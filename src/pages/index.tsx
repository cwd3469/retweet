import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Messages from './Messages';
import Home from './Home';
import Tweet from './Tweet';
import Layout from '../components/Common/Layout';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={'/'} component={Home}></Route>
        <Route exact path={'/tweet/:tweetid'} component={Tweet}></Route>
        <Route path={'/messages'} component={Messages}></Route>
      </Switch>
    </Layout>
  );
};

export default App;
