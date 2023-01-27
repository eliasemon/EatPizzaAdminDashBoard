import { useEffect, useState } from 'react'
import { Button, TextField, Box, Typography, FormControlLabel, Switch } from '@mui/material'
import { setDataToCollection } from '../../../../utils';
import { styled } from '@mui/material/styles';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));



const AutometicTimeChange = ({ forView, setForView, data }) => {
  const [flag, setFlag] = useState(12)

  useEffect(() => {
    setFlag(Math.random())
  }, [forView])
  const automaticTimeChangeHandeler = (e, type) => {
    const hrAndMs = (e.target.value).split(":");
    if (type == "opening") {
      let v = Number(hrAndMs[0])
      setForView(prv => ({ ...prv, openingHR: `${v}.${hrAndMs[1]}` }))
      return
    }
    let v = Number(hrAndMs[0])
    setForView(prv => ({ ...prv, closingHR: `${v}.${hrAndMs[1]}` }))
  }

  const switchHandeler = (key, e) => {
    e.preventDefault();
    const data = { ...forView }
    data[`${key}`] = (data[`${key}`] ? false : true)
    setDataToCollection(data, "ResturentOpeningHr", false)
  }


  const timeStr = (value) => {
    const strCheck = (v) => {
      if ((v.toString()).length == 1) {
        return `0${v}`
      }
      return v
    }
    const hr = Number.parseInt(value)
    let ms = (Number(value)) - hr
    const forms = (value.toString()).split(".")
    return `${strCheck(hr)}:${strCheck(forms[1] ? forms[1] : "0")}`
  }

  const automaticModeAdded = (e) => {
    e.preventDefault()
    setDataToCollection(forView, "ResturentOpeningHr", false)
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <FormControlLabel
          control={
            <Android12Switch
              onChange={(e) => switchHandeler("automaticMode", e)}
              checked={forView.automaticMode}
            />
          }
          label="AUTOMATIC MODE"
        />

        <Box sx={{ position: "relative" }}>
          {forView.automaticMode == false && (
            <Box
              sx={{
                zIndex: 20,
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
              }}
            ></Box>
          )}

          <Box
            sx={{
              zIndex: 10,
              opacity: `${forView.automaticMode ? "1" : "0.4"}`,
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            <Box>
              <Typography variant="h6" mb={2}>
                Automatic Mode Time is Seted From <br />
              </Typography>
              <Box sx={{ display: "flex", gap: "3rem" }}>
                <TextField
                  align="center"
                  value={timeStr(data.openingHR)}
                  type="time"
                  sx={{
                    textAlign: "center",
                    borderRadius: "5px",
                    color: "white",
                    background: "#121212",
                    input: {
                      color: "white",
                    },
                  }}
                />
                <Typography mt={2}>To</Typography>
                <TextField
                  value={timeStr(data.closingHR)}
                  type="time"
                  sx={{
                    textAlign: "center",
                    borderRadius: "5px",
                    color: "white",
                    background: "#121212",
                    input: {
                      color: "white",
                    },
                  }}
                />

                {/* <input disabled value={timeStr(data.openingHR)} type="time" /> */}
                {/* To */}
                {/* <input disabled value={timeStr(data.closingHR)} type="time" /> */}
              </Box>
            </Box>

            <Typography variant="h6" sx={{ textAlign: "center" }}>
              OPENING HOURS
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                value={timeStr(forView.openingHR)}
                onChange={(e) => automaticTimeChangeHandeler(e, "opening")}
                type="time"
                id="outlined-basic"
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  color: "white",
                  input: {
                    color: "white",
                  },
                }}
              />
              <Typography align="center">To</Typography>

              <TextField
                onChange={(e) => automaticTimeChangeHandeler(e)}
                value={timeStr(forView.closingHR)}
                type="time"
                id="outlined-basic"
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  input: {
                    color: "white",
                  },
                }}
              />
            </Box>
            <Button
              onClick={automaticModeAdded}
              variant="contained"
              sx={{ marginTop: "10px" }}
            >
              Set
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

}

export default AutometicTimeChange