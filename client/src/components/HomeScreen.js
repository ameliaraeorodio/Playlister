import React, { useState, useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import UserBar from './UserBar'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import YoutubePlaylister from "./YoutubePlaylister.js";
import { TextField } from '@mui/material'
import {Grid} from '@mui/material'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [expanded, setExpanded] = useState(false);

    const [value, setValue] = React.useState('Player');

    const handleChange = (panel) => (event, isExpanded) => {
        console.log("is something expanded: "+isExpanded);
        setExpanded(isExpanded ? panel : false);
        if(!isExpanded){
            store.closeCurrentList();
        }
        else{
            store.setCurrentList(panel);
        }
        
      };
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    let listCard = "";
    let commentCard = "";
    if(store.currentList){
        commentCard=
        <List sx={{ width: '90%', left: '5%', margin: '5px'}}>

        </List>
    }
    //add a timestamp variable here
    let timeCalc = "";
    console.log('store: ',store);
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', margin: '5px'}}>
            {
                store.idNamePairs.map(pair =>{
                    
                    if(pair.published){
                        timeCalc = new Date(pair.updatedAt)
                        return <ListCard
                        sx = {{ marginTop: '7px',backgroundColor:' #9CAF88'}}
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        expanded = {expanded === pair._id} 
                        onChange = {handleChange(pair._id)}
                        timestamp = {timeCalc.toDateString().substring(4)}
                        user = {pair.userName}
                        isPublished = {true}
                        likes = {pair.likes}
                        isLike = {false}
                        isDislike = {false}
                        dislikes = {pair.dislikes}
                    />
                    }
                    return <ListCard
                    sx = {{ marginTop: '7px',backgroundColor:'white'}}
                    key={pair._id}
                    idNamePair={pair}
                    user = {pair.userName}
                    selected={false}
                    expanded = {expanded === pair._id} 
                    onChange = {handleChange(pair._id)}
                    isPublished = {false}
                />
                })
            }
            </List>;
    }
    const handleTabValue = (event, newValue) => {
        setValue(newValue);
      };
    let tabs = 
        <Box sx={{ width: '100%', margin: '10px'}}>
        <Tabs
        value={value}
        onChange={handleTabValue}
        aria-label=""
        >
        <Tab
            value="Player"
            label="Player"
        />
        <Tab value="Comments" label="Comments" />
        </Tabs>
    </Box>
    const boxSize = {
        position: 'relatifve',
        paddingBottom: '56.25%',
        paddingTop: '30px',
        height: '0',
        overflow: 'hidden'
    }
    const youtubeSize ={
        position: 'absolute',
        top: '0',
        left: '0',
        width: '1%',
        height:'1%'
    }
    let playerComments = "";
    if(value == "Player"){
        playerComments = <Box
        sx = {{boxSize}}>
            <YoutubePlaylister
                sx ={{youtubeSize}}
            />
        </Box>
    }
    if(value === 'Comments'){
        playerComments=
        <Grid container spacing={70}>
            <Grid item xs = {64}>
                <div id = 'comment-section'>
                    {commentCard}
                </div>
            </Grid>
            <Grid item xs={4}>
                <TextField sx={{width: 700}}
                    size = "small" 
                    label = 'add comment'
                    variant="outlined"
                />
            </Grid>
        </Grid>
    }
    let ytvideo = 
    <Box
    >
        {playerComments}
    </Box>
    return (
        <div id = 'home'>
            <div id = 'userbar'>
                <UserBar/>
            </div>
            
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
    
            <div id = 'comment-play-tabs'>
                {tabs}{playerComments}
            </div>
        </div>
        
        )
}

export default HomeScreen;