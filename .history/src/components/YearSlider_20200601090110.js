import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Button } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  root: {
    // paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    color: "white",
  },
  margin: {
    height: theme.spacing(3),
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    fontFamily: "Berkshire Swash, cursive",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function valuetext(value) {
  return `${value}`;
}

export default function YearSlider({ yearSliderChanged }) {
  const classes = useStyles();
  const [value, setValue] = React.useState([1990, 2020]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    yearSliderChanged(value);
  };

  return (
    <div className={classes.root}>
      <div>
        <span>
          <Typography id="range-slider" gutterBottom>
            Released Year
          </Typography>
        </span>
        <span>
          <Button>Reset</Button>
        </span>
      </div>

      <PrettoSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={1990}
        max={2020}
        className="mt-5"
      />

      <div className={classes.margin} />
    </div>
  );
}
