import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactTableWebPartStrings';
import ReactTable from './components/ReactTable';
import { IReactTableProps } from './components/IReactTableProps';
import { sp } from '@pnp/sp/presets/all';

export interface IReactTableWebPartProps {
  description: string;
}

export default class ReactTableWebPart extends BaseClientSideWebPart <IReactTableWebPartProps> {

  public render(): void {
    sp.setup({
      spfxContext: this.context
    })
    const element: React.ReactElement<IReactTableProps> = React.createElement(
      ReactTable,
      {
        description: this.properties.description,
        context : this.context
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
