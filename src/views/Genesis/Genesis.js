import React, {useState, useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import { createGlobalStyle } from 'styled-components';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

function createData(pool, apr, tvl, deposit, earning) {
  return {
    pool,
    apr,
    tvl,
    deposit,
    earning,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row" style={{display : 'flex', alignItems : 'center'}}>
          <img src={`https://swap.tomb.com/images/tokens/${row.pool}.svg`} style={{width : '24px', height : '24px', marginRight : '10px'}} alt='tokenImg'/>
          {row.pool}
        </TableCell>
        <TableCell>{row.apr}</TableCell>
        <TableCell>{row.tvl}</TableCell>
        <TableCell>{row.deposit}</TableCell>
        <TableCell>{row.earning}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: "0px"}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box style={{
                  backgroundColor: "rgba(59,130,246,0.5)",
                  borderRadius: 20,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 40,
                  justifyContent : "space-between",
                  padding: "40px",
                  margin : "40px"
                }}
              sx={{ margin: 1 }} >
                <Grid container spacing={12} style={{justifyContent : "space-between"}}>
                  <Grid item xs={5}>
                    <Grid container style={{
                      border : "1px solid white",
                      borderRadius : "20px",
                    }}>
                      <Grid item xs={6} style={{padding : "5px"}}>
                        <Button className={[checked ? 'checkedBtn' : null, 'depositBtn']} onClick={()=>{handleClick()}}>Deposit</Button>
                      </Grid>
                      <Grid item xs={6} style={{padding : "5px"}}>
                        <Button className={[checked ? null : 'checkedBtn', 'depositBtn']} onClick={()=>{handleClick()}}>Earning</Button>
                      </Grid>
                    </Grid>
                    <Grid container className='amountInfo'>
                      <Grid item xs={6} style={{padding : "5px"}}>
                        <p>Enter an amount</p>
                        <p>$0.00</p>
                      </Grid>
                      <Grid item xs={6} style={{padding : "5px"}}>
                        <Grid container>
                          <Grid item xs={6} style={{padding : "5px"}}>
                            <Button className='depositAmountBtn'>50%</Button>
                          </Grid>
                          <Grid item xs={6} style={{padding : "5px"}}>
                            <Button className='depositAmountBtn'>Max</Button>
                          </Grid>
                        </Grid>
                        <p style={{textAlign : 'center'}}>Balance: 0.0000 WFTM</p>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Button className='connectWalletBtn'>Connect Wallet</Button>
                    </Grid>
                    <p>There is a 0.5% deposit fee for this staking pool.</p>
                  </Grid>
                  <Grid item xs={5}>
                    <p>WFTM staked</p>
                    <p>0</p>
                    <Button className='harvestBtn'>Harvest</Button>
                  </Grid>
                </Grid>
              </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const activerows = [
  createData('LSHARE', 0.00, 6.0, 24, 4.0,4.0),
];
const mygenesisrows = [
];
const inactiverows = [
  createData('LSHARE', 0.00, 6.0, 24, 4.0,4.0),
  createData('TOMB', 0.00, 9.0, 37, 4.3,4.0),
  createData('TSHARE', 0.00, 16.0, 24, 6.0, 4.0),
  createData('L3USD', 0.00, 3.7, 67, 4.3, 4.0),
  createData('WBTC', 0.00, 16.0, 49, 3.9, 4.0),
];

const options = [
  '2023 Q1',
  '2022 Q4',
  '2022 Q3',
];

const Home = () => {
  const [showType, setShowType] = useState('active');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const handleActiveClick = () => {
    setShowType('active')
  }

  const handleMyGenesisClick = () => {
    setShowType('mygenesis')
  }

  const handleInactiveClick = () => {
    setShowType('inactive')
  }

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3} columns={6}>
        <Box 
          style={{
            backgroundColor: "rgba(99, 78, 185, 0.9)",
            padding: 25,
            width: "100%",
            borderRadius: 20,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 40
          }}>
          <Box
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              backgroundColor: "rgb(255, 242, 209)",
              color: "rgb(57, 64, 78)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AccessTime size="large"/>
          </Box>
          0d 0h 0m 0s left to earn rewards in these Nursery Pools
        </Box>
      </Grid>
      <Grid container spacing={3} display = "flex" style={{marginTop : "70px"}}>
        <Box style={{
          backgroundColor: "rgba(86 26 247 / 76%)",
          padding: 25,
          width: "100%",
          borderRadius: 20,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          justifyContent : "space-between",
          borderBottomLeftRadius : 0,
          borderBottomRightRadius : 0
        }}>
          <div style={{display : "flex"}}>
            <Box
              style={{
                padding: "10px 24px",
                borderRadius: 30,
                backgroundColor: "rgb(255, 242, 209)",
                color: "rgb(57, 64, 78)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 40,
                cursor: 'pointer'
              }}
              onClick={()=>{handleActiveClick()}}
            >
              Active
            </Box>
            <Box
              style={{
                padding: "10px 24px",
                borderRadius: 30,
                backgroundColor: "rgb(255, 242, 209)",
                color: "rgb(57, 64, 78)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 40,
                cursor: 'pointer'
              }}
              onClick={()=>{handleMyGenesisClick()}}
            >
              My Genesis
            </Box>
            <Box
              style={{
                padding: "10px 24px",
                borderRadius: 30,
                backgroundColor: "rgb(255, 242, 209)",
                color: "rgb(57, 64, 78)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 40,
                cursor: 'pointer'
              }}
              onClick={()=>{handleInactiveClick()}}
            >
              Inactive
            </Box>
          </div>
          <div style={{display : "flex"}}>
            <List
              component="nav"
              aria-label="Device settings"
              sx={{ bgcolor: 'background.paper' }}
              style={{background : 'transparent'}}
            >
              <ListItem
                button
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
                style={{
                  padding: "10px 24px",
                  borderRadius: 30,
                  backgroundColor: "rgb(255, 242, 209)",
                  color: "rgb(57, 64, 78)",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ListItemText
                  secondary={options[selectedIndex]}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Box>
        <Box style={{
          backgroundColor: "rgba(59,130,246,0.5)",
          width: "100%",
          borderRadius: 20,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          justifyContent : "space-between",
          borderTopLeftRadius : 0,
          borderTopRightRadius : 0
        }}>
          <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{background : "rgba(99, 78, 185, 0.9)"}}>
        <TableHead>
          <TableRow>
            <TableCell>Pool</TableCell>
            <TableCell>APR</TableCell>
            <TableCell>TVL</TableCell>
            <TableCell>Deposit</TableCell>
            <TableCell>Earning</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showType === "inactive" ? inactiverows.map((row) => (
            <Row key={row.name} row={row} />
          )) : <></>}
          {showType === "active" ? activerows.map((row) => (
            <Row key={row.name} row={row} />
          )) : <></>}
          {showType === "mygenesis" ? mygenesisrows.map((row) => (
            <Row key={row.name} row={row} />
          )) : <></>}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
      </Grid>
    </Page>
  );
};

export default Home;
