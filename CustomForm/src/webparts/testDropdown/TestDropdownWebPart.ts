import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TestDropdownWebPartStrings';
import TestDropdown from './components/TestDropdown';
import { ITestDropdownProps } from './components/ITestDropdownProps';
import { sp } from '@pnp/sp/presets/all';

export interface ITestDropdownWebPartProps {
  description: string;
}

export default class TestDropdownWebPart extends BaseClientSideWebPart<ITestDropdownWebPartProps> {

  public render(): void {
    sp.setup({
      spfxContext: this.context
    })


    const element: React.ReactElement<ITestDropdownProps> = React.createElement(
      TestDropdown,
      {
        description: this.properties.description,
        context: this.context
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
