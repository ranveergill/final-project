import React from "react"
import style from "./styleConstants"
import { NavLink, useHistory } from "react-router-dom"
import styled, { keyframes } from "styled-components"

export const SearchPage = () => {
    console.log("search")
    return (
        <Wrapper>
            <Head>Search by Type:</Head>
            <Cat exact to="/posts/type/seeking">
                Seeking
            </Cat>
            <Cat exact to="/posts/type/offering">
                Offering
            </Cat>
            <Head>Search by Category:</Head>
            <Cat exact to="/posts/bycategory/artandcraft">
                Art and Craft
            </Cat>
            <Cat exact to="/posts/bycategory/sportsandfitness">
                Sports and Fitness
            </Cat>
            <Cat exact to="/posts/bycategory/foodanddrink">
                Food and Drink
            </Cat>
            <Cat exact to="/posts/bycategory/homeandgarden">
                Home and Garden
            </Cat>
            <Cat exact to="/posts/bycategory/computersandtechnology">
                Computers and Technology
            </Cat>
            <Cat exact to="/posts/bycategory/other">
                Other
            </Cat>
        </Wrapper>
    )
}

const button = keyframes`
  0% {
    background-color:rgb(86, 211, 252, 0.0); margin-top: 6px;
  }

  100% {
    background-color: rgb(86, 211, 252, 0.2); margin-top: 10px;
  }
`

const Wrapper = styled.div`
    margin: 20px 10vw;
`

const Head = styled.p`
    font-weight: bold;
    color: ${style.charcoal};
    margin: 15px auto;
`

const Cat = styled(NavLink)`
    display: block;
    width: 70%;
    color: ${style.black};
    background-color: rgb(86, 211, 252, 0.2);
    font-weight: bold;
    border-radius: 17px;
    /* margin: 17px auto; */
    margin: auto;
    margin-top: 10px;
    animation: 0.7s ${button} ease;
    padding: 10px 20px;
    border: 2px solid ${style.black};
    cursor: pointer;
`

export default SearchPage
