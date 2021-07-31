/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import SearchbarCarousel from './SearchbarCarousel';

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [imageCarousel, showImageCarousel] = useState(false);

  const handleClose = () => {
    setDialogValue({
      tags: '',
      // themes: ''
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    tags: '',
    themes: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(value);
    console.log(value);
    setValue({
      tags: dialogValue.tags,
      themes: dialogValue.themes,
    });
    handleClose();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/images?tag=${query}`
        );
        const json = await response.json();
        console.log({ json });
        setResults(json);
        showImageCarousel(true);
      } catch (error) { }
    }

    if (query !== "") {
      console.log("the data does not exist");
      fetchData();
    }
  }, [query]);

  return (
    <div>

      <React.Fragment>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                  tags: newValue,
                });
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue({
                tags: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={top100Films}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.title;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(option) => option.title}
          style={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Search tags about migration" variant="outlined" />
          )}
        />
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">Search</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Search tags about migration
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.tags}
                onChange={(event) => setDialogValue({ ...dialogValue, tags: event.target.value })}
                label="title"
                type="text"
              />
              <TextField
                margin="dense"
                id="name"
                value={dialogValue.themes}
                onChange={(event) => setDialogValue({ ...dialogValue, themes: event.target.value })}
                label="year"
                type="number"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
      {imageCarousel &&
        <SearchbarCarousel props={results} />
      }

    </div>
  );
}
