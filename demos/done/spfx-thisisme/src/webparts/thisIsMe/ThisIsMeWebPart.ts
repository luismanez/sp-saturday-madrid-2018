import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "ThisIsMeWebPartStrings";
import ThisIsMe from "./components/ThisIsMe";
import { IThisIsMeProps } from "./components/IThisIsMeProps";

export interface IThisIsMeWebPartProps {
  description: string;
}

export default class ThisIsMeWebPart extends BaseClientSideWebPart<IThisIsMeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IThisIsMeProps > = React.createElement(
      ThisIsMe,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
