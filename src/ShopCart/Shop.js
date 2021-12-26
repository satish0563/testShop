import React , { useEffect, useState } from "react";
import Content from "../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/AddShoppingCart";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import SearchBar from "material-ui-search-bar";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
   },card: {
    maxWidth: 350,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
},
media: {
    height:150
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(112%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifycontentContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
 
}));



export default function ShopCart({ id }) {
  const [data, setData] = useState([]);
  const [dommydata, setDommydata] = useState([]);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState();
  useEffect(() => {
    if(count===0)
    {
      fetch("https://mocki.io/v1/f06aa14b-3e3d-488b-a239-6ffc53aae752")
      .then((res) => res.json())
      .then((data) => setData(data));
     
    }
   
    
  }, [count, setCount]);
  const classes = useStyles();
  const loading = false;

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }
  const handleCall = (event,pricetype) => {
 if(pricetype==='LP')
  {
     data.sort((a,b) => a.Price - b.Price);
     setData(data);
    setDommydata(data);
    setCount(count+1);
    console.log("dadasdadad"+JSON.stringify(data))
  }
  if(pricetype==='HP')
  {
    data.sort((a,b) => b.Price - a.Price);
    setData(data);
    setDommydata(data);
    setCount(count+1);
    console.log("HL"+JSON.stringify(data))
  }
 }
 const handleClick = (e) => {
  let filteredData = data.filter(item => {
    return item.title.toLowerCase().includes(value)
  });
  
  setData(filteredData);
}
const handleCancel = (e) => {
  setData(dommydata);
 }


const handleChange = (e,val) => {
  if(val !==undefined && val !=="" )
  {
    let filteredData = data.filter(item => {
      return item.title.toLowerCase().includes(val)
     
    });
    setData(filteredData);
  }
  else{
    setData(dommydata);
  }
 

}
  return (
    <Content>
      <div
        style={{
          height: "30px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "contrast(75%)",
          backgroundImage: "url(/img/wallpaper.jpeg)",
        }}
      />
      <div className={classes.headerContainer}>
        <div className={classes.header}>
       <Chip variant={"outlined"} onClick={(event) =>handleCall(event,'LP')} label="Low Price" />
          <Chip variant={"outlined"} onClick={(event) =>handleCall(event,'HP')} label="High Price" />
          
          <div className={classes.spacer} />
          <SearchBar
          value={value}
          onCancelSearch={() => handleCancel()}
         onChange={(newValue) =>handleChange(setValue(newValue),newValue)}
         onRequestSearch={() => handleClick(value)}
         style={{
         margin: '19 auto',
         maxWidth: 800,
         height:35
      }}
    />
 <div className={classes.spacer} />
          <div className={classes.actionGroup}>
          <Button color="primary"
                  variant="contained"
                  startIcon={<EditIcon />} >
                  Processed Order
                </Button></div>
        </div>
      </div>
      <div className={classes.summaryCards}>
      <div>
    <Container>
      <Typography
        color="textPrimary"
        gutterBottom
        variant="h2"
        align="center" >
       
      </Typography>
      <Grid container spacing={1}>
        {data.map((character) => (
          <Grid item xs={12} sm={3} key={character.Price}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image= {character.img} 
              />
              <CardContent >
                <div  style={{ display: 'flex',flexFlow:'column-wrap'}}>
                <Typography  style={{  width: 100,textAlign: 'left',fontSize:14,fontWeight:'bold'}} color="text.secondary" variant="p" display="inline">
                  {character.title} 
                </Typography>
               <Typography  style={{  width: 100,textAlign: 'right',color: 'red'}} sx={{ mb: 1.5 }} color="text.secondary">
                {character.Price}Yen
                 </Typography>
                 </div>
                 <div  style={{ display: 'flex',flexFlow:'column-wrap'}}>
                 <Typography  style={{  width: 100,textAlign: 'left',fontSize:12}} color="text.secondary" variant="p" display="inline">
                 {character.description}
                </Typography>
                <ExpandMore style={{  width: 100,marginTop:52, textAlign: 'right'}} />
          </div>
    </CardContent>
 </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </div>
</div>
 </Content>
  );
}


