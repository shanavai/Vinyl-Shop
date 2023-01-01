import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Box, Typography, Tab, Tabs, useMediaQuery} from "@mui/material";
import Item from '../../components/Item';
import {setItems} from "../../state"

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state)=>state.cart.items); 
    const isNonMobile = useMediaQuery("(min-width:600px)")

    async function getItems(){
        const items = await fetch(
            "http://localhost:1337/api/items?populate=image",
            { method: "GET" }
          );
          const itemsJson = await items.json();
          dispatch(setItems(itemsJson.data));
    }
 
    const electronic = items.filter((item) => item.attributes.category === "electronic")
    const folk = items.filter((item) => item.attributes.category === "folk")
    const hiphop = items.filter((item)=> item.attributes.category === "hiphop") 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
        getItems();
    }, []) 

  return (
    <Box width="80%" margin="80px auto">
        <Typography variant="h3" textAlign="center">
            Our Featured <b>Products</b>
        </Typography>

        <Tabs
            textColor='primary'
            indicatorColor='primary'
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{sx:{display: isNonMobile ? "block" : "none"}}}
        >
        <Tab label="ALL" value="all" />
        <Tab label="ELECTRONIC" value="electronic" />
        <Tab label="FOLK" value="folk" />
        <Tab label="HIPHOP" value="hiphop" />
        </Tabs>

        <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "electronic" &&
          electronic.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "folk" &&
          folk.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "hiphop" &&
          hiphop.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>    
)
}

export default ShoppingList