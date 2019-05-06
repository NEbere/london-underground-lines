// Third party imports
import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

// Local imports
import Header from './components/header';
import Footer from './components/footer';
import StatusList from './components/list';
import LineDetail from './components/line';
import StationDetail from './components/stations';

// Initialize font awesome
library.add(faGhost)
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <div>
            <Route path="/" exact component={StatusList} />
            <Route path="/lines/:lineId" component={LineDetail} />
            <Route path="/stations/:stationId" component={StationDetail} />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
