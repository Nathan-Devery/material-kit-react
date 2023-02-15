// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, CardActions, CardContent, Button, FormGroup, FormControlLabel, Checkbox, CardActionArea } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import "@fontsource/kalam";

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  const rotateDegree = Math.floor(Math.random() * 3) - 1; // generates a random number between -1 and 1
  const rotateDirection = Math.random() < 0.5 ? '-' : ''; // generates a random direction
  
  return (
    <CardActionArea
      sx={{
        transform: `rotate(${rotateDirection}${rotateDegree}deg)`, // sets the random degree and direction
        ...sx,
      }}
    >
    <Card
      
      // sx={{
      //   py: 5,
      //   boxShadow: 0, 
      //   // textAlign: 'center',
      //   color: (theme) => theme.palette[color].darker,
      //   bgcolor: (theme) => theme.palette[color].lighter,
      //   ...sx,
      // }}
      // {...other}
      variant="outlined"
      sx={{
        py: 5,
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        padding: '20px',
        // width: '300px',
        // height: '300px',
        boxShadow: '2px 2px 4px #000000',

        borderRadius: 0,
        ...sx,
      }}
    >

      {/* <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography> */}
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title} 
        </Typography> */}
        <Typography variant="h5" fontFamily="Kalam" component="div">
          As a logged-in user,
        </Typography>
        <Typography variant="h5" fontFamily="Kalam" component="div">
          I want to be able to report unsuitable content,
        </Typography>
        <Typography variant="h5" fontFamily="Kalam" component="div">
          So that the website admin can review and/or remove the content
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      </CardActions>
    </Card>
    </CardActionArea>
  );
}
