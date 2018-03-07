import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'reducers'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {
  RouteContainer
} from 'containers'
import { Helmet } from 'react-helmet'
import { Notification } from 'components/Notification';

class App extends React.Component {
  render() {
    return (
      <div className="root-container">
        <Helmet>
          <link rel="stylesheet" href="./fonts/fonts.css" />
        </Helmet>
        <Provider store={store}>
          <Router>
            <Route path="/" component={RouteContainer} />
          </Router>
        </Provider>
        <Notification/>
      </div>
    );
  }
}

export default App
