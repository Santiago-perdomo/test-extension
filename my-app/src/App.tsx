import React from "react";

import { init } from "dc-extensions-sdk";
import { SdkContext, withTheme } from "unofficial-dynamic-content-ui";

interface AppState {
  connected: boolean;
  sdk?: any;
  value?: string;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { connected: false };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleChooseLink = this.handleChooseLink.bind(this);
  }

  public componentDidMount(): void {
    this.handleConnect();
  }

  public async handleConnect(): Promise<void> {
    const sdk = await init() as any;

    const value: any = await sdk.field.getValue();
    this.setState({
      sdk,
      connected: true,
      value
    });
  }

  public handleValueChange(value: any): void {
    if (this.state.connected && this.state.sdk) {
      this.state.sdk.field.setValue(value);
    }
  }

  public async handleChooseLink(): Promise<{ href: string; title: string }> {
    return { href: "", title: "" };
  }

  public render(): React.ReactElement {
    const { connected, value, sdk } = this.state;

    return (
      <div className="App">
        {connected && sdk ? (
          <div>
            {
              withTheme(
                <SdkContext.Provider value={{ sdk }}>
                
                </SdkContext.Provider>
              )
            }
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
      </div>
    );
  }
}