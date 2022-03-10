

import React ,{ useEffect, useState}from 'react';
import { Button,Card,Chip, Tabs,Tab,CardContent, CardActionArea,CssBaseline,Container, Typography, CardActions, AppBar} from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/core/styles'
import { classes } from '@material-ui/styles';

const useStyles = makeStyles({
     Card: {

      marginBottom: 10
    },
    CardContent: 
    {
      padding: '5px'
    },
    CardActions:{
      padding: '24px'
    }
    ,
    Chip:{

    },


});

const Category = withStyles({
root: {
  margiTop: 10,
  marginBottom: 10
}
})(Chip)



function App() {
  const [jokes, setJokes] = useState([]);

  const [jokesToShow,setJokesToShow ] = useState([]);

  const [likedJokes, setLikedJokes] = useState([])

  const classes = useStyles();

  const [currentTab, setCurrentTab]= useState(0)

useEffect(()=>{
  fetch('https://api.icndb.com/jokes')
  .then(res => res.json())
  .then(res => {
    console.log(res);
    setJokes(res.value);
    setJokesToShow(res.value.slice(0,10))

  })
  .catch((err) => console.log(err));
},[]);

const likeJoke = (id) => {
  if (likedJokes.find((j) => j.id === id)) return;
  const likedJoke = jokes.find((j) => j.id === id);
  setLikedJokes([likedJoke, ...likedJokes]);
};


  const changeTab = (event,value) =>{
    setCurrentTab(value)
  }
  return (
    <div className="App">
      <CssBaseline />
      <Container>

      <Typography variant='h1' align = 'center'>
           CHUK JOKES
        </Typography>
      <AppBar style = {{marginBottom:20}} position = 'sticky'>

      <Tabs value = {currentTab} onChange={changeTab}>
          <Tab label = "Home" id="home-tab" aria-controls="home-panel" / >
          <Tab label = "Joks" id="Joks-tab" aria-controls="joke-panel" / >
          </Tabs>
      </AppBar>
             <div role = "tabpanel" hidden={currentTab !== 0}> 
             
                      

        {jokesToShow.map(joke =>(

          <Card key = {joke.id} className={classes.card}>
            <CardContent className = {classes.cardContent}>
                 {joke.categories.length > 0 ? (
                   joke.categories.map(cat =>(
                     <Category label={cat} key={cat} varient='outlined'  />  
                   ))
                ) : <Category label = "Animal" nimavarient = 'outlined'/>

                   
                  }


               <Typography>{joke.joke}</Typography>
              </CardContent>
              <CardActions className={classes.CardActions} >

                <Button varient = "contained"color = "primary" onClick={()=> likeJoke(joke.id)}>Generate Jok</Button>

               
              </CardActions>


          </Card>
        ))}
         </div>
        <div role = "tabpanel" hidden = {currentTab !==1}>               

{likedJokes.map(joke =>(

  <Card key = {joke.id} className={classes.card}>
    <CardContent className = {classes.cardContent}>
         {joke.categories.length > 0 ? (
           joke.categories.map(cat =>(
             <Category label={cat} key={cat} varient='outlined'  />  
           ))
        ) : <Category label = "Animal" varient = 'outlined'/>}


       <Typography>{joke.joke}</Typography>
      </CardContent>
      <CardActions className={classes.CardActions} >

        <Button varient = "contained"color = "primary" href="home-tab">Back</Button>

    

      </CardActions>

    


      <CardActions className={classes.CardActions} >

        <Button varient = "contained"color = "primary" href="https://api.chucknorris.io/jokes/random">Random Joke</Button>

    
      </CardActions>
       

  </Card>
))} </div>
      </Container>
      

      
    </div>
  );
}

export default App;
