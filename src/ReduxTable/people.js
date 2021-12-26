import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  remove, selectPeople, selectLoading } from "./peopleSlice";
import MuiAlert from "@material-ui/lab/Alert";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Content from "../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import PeopleDialog from "../People/PeopleDialog";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import DeletePeopleDialog from "../People/DeletePeopleDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import { SummaryCard } from "../People/Driver";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import TablePagination from "@material-ui/core/TablePagination";
import AssistantPhoto from "@material-ui/icons/AssistantPhoto";
import MoreVert from "@material-ui/icons/MoreVert";
import Delete from "@material-ui/icons/Delete";
import Archive from "@material-ui/icons/Archive";
import Email from "@material-ui/icons/Email";
import SearchBar from "material-ui-search-bar";
import Menu from '@material-ui/core//Menu';
import MenuItem from '@material-ui/core//MenuItem';
import ListItemIcon from '@material-ui/core//ListItemIcon';
import Divider from '@material-ui/core//Divider';
import { ja } from "date-fns/locale";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "trips", numeric: true, disablePadding: false, label: "Trips" },
];

function EnhancedTableHead(props) {
  const {
   onSelectAllClick,
   numSelected,
   rowCount,
  onRequestSort,
  } = props;
 

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  grow: {
    flexGrow: 1,
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
  },
}));

export default function People() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [idval, setIdval] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const rows = useSelector(selectPeople);
  const loading = useSelector(selectLoading);
  const error = false;
  // todo with snacks
  const [snackOpen, setSnackOpen] = React.useState(false);
  const dispatch = useDispatch();

  let history = useHistory();

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  if (error) return `Error! ${error.message}`;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const selectTableRow = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    console.log("newSelectedmenu3===="+newSelected);
    setSelected(newSelected);
  };


  const selectTableRowMenu = (event,id) => {
    const selectedIndexmenu = selected.indexOf(id);
    let newSelectedmenu = [];

    if (selectedIndexmenu === -1) {
      newSelectedmenu = newSelectedmenu.concat(selected, id);
    } else if (selectedIndexmenu === 0) {
      newSelectedmenu = newSelectedmenu.concat(selected.slice(1));
    } else if (selectedIndexmenu === selected.length - 1) {
      newSelectedmenu = newSelectedmenu.concat(selected.slice(0, -1));
    } else if (selectedIndexmenu > 0) {
      newSelectedmenu = newSelectedmenu.concat(
        selected.slice(0, selectedIndexmenu),
        selected.slice(selectedIndexmenu + 1)
      );
    }
    console.log("newSelectedmenu===="+newSelectedmenu);
    
      dispatch(remove(newSelectedmenu));

      setSnackOpen(
        `${newSelectedmenu.length} Mail${
          newSelectedmenu.length > 1 ? "s" : ""
        } Deleted`
      );
     
      event.stopPropagation();

    
    //setSelected(newSelectedmenu);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const snackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  
  
  const SetFlag = (event,ids,checkbox) => {
    if(ids && checkbox !=="checkbox")
    {
      document.getElementById(ids).style.backgroundColor="#e8bae8";
    }
    else
    {
      let galleries = document.getElementsByClassName("MuiTableRow-hover Mui-selected");
      var len =  galleries.length;
      if(len>0)
      {
        for(var i=0 ; i<len; i++){
          galleries[i].style.backgroundColor="#e8bae8";
       }
      }
      else{
        let galleriesVal = document.getElementsByClassName("MuiTableRow-root");
      var length =  galleriesVal.length;
      if(length>0)
      {
        for(var j=0 ; j<length; j++){
          galleriesVal[j].style.backgroundColor="#ffffff";
       }
      }
    }
    }
    setAnchorEl(null);
     setSelected([]);
   // event.stopPropagation();
  };
  const open = Boolean(anchorEl);

  const handleClick = (event,id) => {
    setAnchorEl(event.currentTarget);
    setIdval(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Content>
      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={snackClose}>
        <Alert onClose={snackClose} severity="success">
          {snackOpen}
        </Alert>
      </Snackbar>
     
      <div className={classes.root}>
        <Toolbar>
        <Button className={classes.deleteButton}
                    variant="contained"
                    color="primary"
                    endIcon={<Email />}
                  >
                    {" "}
                New Email
                  </Button>

                  <div className={classes.spacer} />
          <SearchBar
        style={{
          marginLeft: 85,
         maxWidth: 800,
         height:35
      }}
    />
          <div edge="start" className={classes.grow} />
         
          {selected.length >= 0 && (
            <Tooltip title={"Delete"}>
              <DeletePeopleDialog
                ids={selected}
                msg="delete"
                onSave={() => {
                  dispatch(remove(selected));
                   setSnackOpen(
                    `${selected.length} Mail${
                      selected.length > 1 ? "s" : ""
                    } Deleted`
                  );
                  setSelected([]);
                }}
                render={(open) => (
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    color="secondary"
                    endIcon={<DeleteIcon />}
                    onClick={open}
                  >
                    {" "}
                 Delete {selected.length}
                  </Button>
                )}
              />
            </Tooltip>
          )}

{selected.length >= 0 && (
            <Tooltip title={"Delete"}>
              <DeletePeopleDialog
                ids={selected}
                msg="Set Flag"
                onSave={(e) => {
                  SetFlag(e,selected,"checkbox")
                
                }}
                render={(open) => (
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    color="secondary"
                    endIcon={<AssistantPhoto />}
                    onClick={open}
                  >
                    {" "}
                   Flag {selected.length}
                  </Button>
                )}
              />
            </Tooltip>
          )}

{selected.length >= 0 && (
            <Tooltip title={"Delete"}>
              <DeletePeopleDialog
                ids={selected}
                msg="Archive"
                onSave={() => {
                  dispatch(remove(selected));

                  setSnackOpen(
                    `${selected.length} Mail${
                      selected.length > 1 ? "s" : ""
                    } Deleted`
                  );
                  setSelected([]);
                }}
                render={(open) => (
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    color="secondary"
                    endIcon={<Archive />}
                    onClick={open}
                  >
                    {" "}
                 Archive
                  </Button>
                )}
              />
            </Tooltip>
          )}
        </Toolbar>
        <SummaryCard
        value={
            <>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={"small"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            id={row.id}
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={`person-${row.id}`}
                            selected={isItemSelected}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell
                              padding="checkbox"
                              onClick={(e) => {
                                selectTableRow(row.id);
                              }}
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                                onChange={(e) => {
                                  selectTableRow(row.id);
                                }}
                              />
                            </TableCell>
                            <Menu
        anchorEl={anchorEl}
        id={idval}
        open={open}
        
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              backgroundColor: '#faf9f9',
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem  id={idval} onClick={(e) => {
                                  selectTableRowMenu(e,idval);
                                }}  ids={selected}
                               >
                 
         <Delete >  </Delete>Delete
        </MenuItem>

        
        <MenuItem onClick={(e) => {SetFlag(e,idval)}} >
           <AssistantPhoto />Flag
        </MenuItem>
        <MenuItem onClick={handleClose}>
         <Archive />Archive
        </MenuItem>
        </Menu>
                            <TableCell  onChange={(e) => {
                                  selectTableRow(row.id);
                                }} >
                              <AssistantPhoto/>
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              style={{ fontSize:12,fontWeight:'bold'}}
                            >
                            {row.name}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              style={{ fontSize:11}}
                            >
                                {row.text}
                            </TableCell>
                            <TableCell style={{ fontSize:11}} align="right">{row.date}</TableCell>
                            <TableCell>
                              <MoreVert id={row.id} onClick={(event) =>handleClick(event,row.id)} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          }
        />
      </div>
      
    </Content>
  );
}
