import React from "react";

interface IContextProps {
  data: {
    current: any;
  };
  set: (data: any) => void;
}

const defaultContextValue: IContextProps = {
  data: {
    current: {
      completed: [],
    },
  },
  set: (data: any) => {},
};

const { Provider, Consumer } = React.createContext(defaultContextValue);

class ContextProviderComponent extends React.Component<{}, IContextProps> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);

    this.setData = this.setData.bind(this);
    this.state = {
      ...defaultContextValue,
      set: this.setData,
    };
  }

  setData(newData: any) {
    this.setState((state) => ({
      data: {
        ...state.data,
        ...newData,
      },
    }));
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { Consumer as default, ContextProviderComponent };
