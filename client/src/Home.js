import React, { useContext } from "react"
import styled, { keyframes } from "styled-components"
import { AppContext } from "./AppContext"
import Hero from "./assets/hero.png"
import style from "./styleConstants"

export const Home = () => {
    const { signInWithGoogle } = useContext(AppContext)
    return (
        <Wrapper>
            <Img src={Hero} />
            <Main>
                Pass on your skills and talents while getting to know people in
                your community
            </Main>

            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </Wrapper>
    )
}

const fadeIn = keyframes`
  0% {
    box-shadow: 0px 0px 0px 0px rgb(4, 95, 181, 0.0);   margin: 30px 30px;
  }
  100% {
    box-shadow: 2px 2px 8px -2px rgb(4, 95, 181, 0.5);    margin: 20px 30px;
  }
`

const Wrapper = styled.div`
    margin: 20px 30px;
    text-align: center;
    box-shadow: 2px 2px 8px -2px rgb(4, 95, 181, 0.5);
    animation: 1s ${fadeIn} ease-in-out;
    border-radius: ${style.radius};
    padding: 20px;
`

const Main = styled.div`
    font-size: 20px;
    margin-top: -30px;
    line-height: 1.3em;
    font-family: "Cabin Sketch", cursive;
    font-style: italic;
`

const Button = styled.button``

const Img = styled.img`
    width: 90%;
    border-radius: 100px;
`
export default Home
