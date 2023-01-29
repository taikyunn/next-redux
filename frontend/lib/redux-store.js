import { Component } from "react";
import { initStore } from '../store';

const isServer = typeof window === 'undefined';
const _NRS_ = '_NEXT_REDUX_STORE';

// ストアの初期化
function getOrCreateStore(initialState) {
  if (isServer) {
    return initStore(initialState);
  }

  if (!window[_NRS_]) {
    window[_NRS_] = initStore(initialState);
  }

  return window[_NRS_];
}

export default (App) => {
  return class AppWithRedux extends Component {

    static async getInitialProps (appContext) {
      // ストアの初期化
      const reduxStore = getOrCreateStore();
      // 属性に指定
      appContext.ctx.reduxStore = reduxStore;
      let appProps = {};

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxStore);
    }

    render() {
      return (
        <App {...this.props} reduxStore={this.reduxStore} />
      );
    }
  }
}
