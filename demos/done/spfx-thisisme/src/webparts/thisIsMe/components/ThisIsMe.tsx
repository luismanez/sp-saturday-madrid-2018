import * as React from "react";
import styles from "./ThisIsMe.module.scss";
import { IThisIsMeProps } from "./IThisIsMeProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { IThisIsMe } from "./IThisIsMe";
import { GraphHttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { IThisIsMeState } from "./IThisIsMeState";

export default class ThisIsMe extends React.Component<IThisIsMeProps, IThisIsMeState> {

  constructor(props: IThisIsMeProps) {
    super(props);

    this.state = {
        me: {
          id: "",
          displayName: "fetching data...",
          givenName: "",
          surname: "",
          jobTitle: "",
          mail: ""
        }
    };
}

  public componentDidMount(): void {
    this.getMeData().then(data => {
      this.setState({
        me: data
      });
    });
  }

  public render(): React.ReactElement<IThisIsMeProps> {
    return (
      <div className={ styles.thisIsMe }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p>id: {this.state.me.id}</p>
              <p>name: {this.state.me.givenName}</p>
              <p>surname: {this.state.me.surname}</p>
              <p>display: {this.state.me.displayName}</p>
              <p>job title: {this.state.me.jobTitle}</p>
              <p>e-mail: {this.state.me.mail}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private async getMeData(): Promise<IThisIsMe> {
    const meResponse: HttpClientResponse = await this.props.context.graphHttpClient.get("v1.0/me", GraphHttpClient.configurations.v1);
    const meData: any = await meResponse.json();

    const me: IThisIsMe = {
      id: meData.id,
      givenName: meData.givenName,
      surname: meData.surname,
      displayName: meData.displayName,
      jobTitle: meData.jobTitle,
      mail: meData.mail
    };

    return me;
  }
}
