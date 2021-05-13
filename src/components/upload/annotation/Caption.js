import React from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9611ff",
    },
    secondary: {
      main: "#668389",
    },
  },
});

export default function Caption() {
  return (
    <div className="image-caption">
      <ThemeProvider theme={theme}>
        <TextField
          id="image-caption-input"
          name="image-caption-input"
          label="Description"
          variant="outlined"
          onChange={""}
          placeholder="Caption your picture"
          fullWidth
        />
      </ThemeProvider>
    </div>
  );
}
