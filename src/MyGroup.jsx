import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Hidden,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { rankWith, uiTypeIs } from '@jsonforms/core';

export const myGroupTester = rankWith(1000, uiTypeIs('Group'));

const MyGroupRenderer = (props) => {
  const { uischema, schema, path, visible, renderers } = props;

  const layoutProps = {
    elements: uischema.elements,
    schema: schema,
    path: path,
    direction: 'column',
    visible: visible,
    uischema: uischema,
    renderers: renderers,
  };
  return (
    <Hidden xsUp={!visible}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{uischema.label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MaterialLayoutRenderer {...layoutProps} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Hidden>
  );
};

export default withJsonFormsLayoutProps(MyGroupRenderer);
