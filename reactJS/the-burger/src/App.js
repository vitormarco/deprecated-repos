import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuild from './containers/BurgerBuilder/BurgerBuild';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuild />
        </Layout>
      </div>
    );
  }
}

export default App;
