import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import App from './router'

// const Client = () => {
//   return EASY_ENV_IS_DEV ? <AppContainer><App /></AppContainer> : <App />;
// };

ReactDOM.render(<App />, document.getElementById('app'));