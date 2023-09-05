import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CalculatorWebPartStrings';
import Calculator from './components/Calculator';
import { ICalculatorProps } from './components/ICalculatorProps';
import { sp } from '@pnp/sp/presets/all';

export interface ICalculatorWebPartProps {
  description: string;
}

export default class CalculatorWebPart extends BaseClientSideWebPart <ICalculatorWebPartProps> {

  public render(): void {
    sp.setup({
      spfxContext: this.context
    })
    const element: React.ReactElement<ICalculatorProps> = React.createElement(
      Calculator,
      {
        description: this.properties.description,
        contxt:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
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
