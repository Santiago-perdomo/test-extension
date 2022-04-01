import React from "react";

import { init } from "dc-extensions-sdk";
import { forBuiltInSchema, SdkContext, withTheme } from "unofficial-dynamic-content-ui";
import { Checkbox } from "./ui/Checkbox";

interface AppState {
  connected: boolean;
  sdk?: any;
  value?: string[];
  schema?: Schema
}

interface Schema {
  items: {
    enum: string[],
    type: string
  }
  title: string,
  uniqueItems: boolean
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
    console.log('version:9')
    const sdk = await init() as any;

    const value: any = await sdk.field.getValue();
    console.log(value)
    const schema: Schema = await sdk.field.schema;
    console.log(schema)
    this.setState({
      sdk,
      connected: true,
      value,
      schema
    });
  }

  public handleValueChange(state: any, item: string, value?: string[]): void {
    if (!value) return;
    if (state) {
      value.push(item)
    } else {
      value.splice(value.findIndex((element) => element === item), 1)
    }
    if (this.state.connected && this.state.sdk) {
      console.log(value)
      this.state.sdk.field.setValue(value);
    }
  }

  public async handleChooseLink(): Promise<{ href: string; title: string }> {
    return { href: "", title: "" };
  }

  public render(): React.ReactElement {
    const { connected, value, sdk, schema } = this.state;
    return (
      <div className="App">
        {connected && sdk ? (
          <div>
            <SdkContext.Provider value={{ sdk }}>
              {
                schema?.items.enum.map(item => <Checkbox value={value?.includes(item) ?? false} onChange={(state) => this.handleValueChange(state, item, value)} ><span>{item}</span></Checkbox>)
              }
            </SdkContext.Provider>
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
      </div>
    );
  }
}