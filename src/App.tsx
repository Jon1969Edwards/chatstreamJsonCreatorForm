import { Fragment, useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './App.css';
import schema from './schema.json';
import { Generate } from '@jsonforms/core';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@material-ui/core/styles';
import MyGroupRenderer, { myGroupTester } from './MyGroup';

const useStyles = makeStyles((_theme) => ({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto',
    display: 'block',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
    marginBottom: '1rem',
  },
}));

const initialData = {};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  { tester: myGroupTester, renderer: MyGroupRenderer },
];

const App = () => {
  const classes = useStyles();
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [jsonformsData, setJsonformsData] = useState<any>(initialData);

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(jsonformsData, null, 2));
  }, [jsonformsData]);

  const clearData = () => {
    setJsonformsData({});
  };

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          {/* <img src={logo} className='App-logo' alt='logo' /> */}
          <h4 className='App-title'>
            Welcome to Chatstream Forms JSON Creator
          </h4>
          <p className='App-intro'></p>
        </header>
      </div>

      <Grid
        container
        justify={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            JSON Form
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={Generate.uiSchema(schema)}
              data={jsonformsData}
              renderers={renderers}
              cells={materialCells}
              onChange={({ data }) => setJsonformsData(data)}
            />
          </div>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            JSON Data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{displayDataAsString}</pre>
          </div>
          <Button
            className={classes.resetButton}
            onClick={() => navigator.clipboard.writeText(displayDataAsString)}
            color='primary'
            variant='contained'
          >
            copy to clipboard
          </Button>
          <br></br>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear data
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
