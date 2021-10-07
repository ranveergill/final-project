import React, { useContext } from "react"
import styled, { keyframes } from "styled-components"
import { AppContext } from "./AppContext"
import { useHistory } from "react-router-dom"
import style from "./styleConstants"

export const AccountDetails = () => {
    const { appUser } = useContext(AppContext)
    let history = useHistory()

    return (
        <Wrapper>
            {appUser.photoURL ? (
                <Img
                    src={appUser.photoURL}
                    alt={`${appUser.displayName}'s profile`}
                />
            ) : appUser.displayName ? (
                <Placeholder>{appUser.displayName[0]}</Placeholder>
            ) : (
                <div></div>
            )}
            <UserInfo>{appUser.displayName}</UserInfo>
            <UserEmail>{appUser.email}</UserEmail>
            <Button
                onClick={() => history.push(`/user/${appUser.email}/messages`)}
            >
                My Messages
            </Button>
            <Button
                onClick={() => history.push(`/user/${appUser.email}/posts`)}
            >
                My Posts
            </Button>
            <Button
                onClick={() => history.push(`/user/${appUser.email}/favorites`)}
            >
                My favorites
            </Button>
        </Wrapper>
    )
}

const fadeIn = keyframes`
  0% {
    box-shadow: 0px 0px 0px 0px rgb(4, 95, 181, 0.0);
  }
  100% {
    box-shadow: 2px 2px 8px -2px rgb(4, 95, 181, 0.5);
  }
`

const button = keyframes`
  0% {
    background-color:rgb(86, 211, 252, 0.0); margin-top: 10px;
  }

  70% {
    background-color: rgb(86, 211, 252, 0.4); margin-top: 0px;
  }

  100% {
    background-color: rgb(86, 211, 252, 0.3); margin-top: 0px;
  }
`

const Wrapper = styled.div`
    margin: 0px 10vw 20px 10vw;
    text-align: center;
    box-shadow: 2px 2px 8px -2px rgb(4, 95, 181, 0.8);
    animation: 1s ${fadeIn} ease;
    border-radius: ${style.radius};
    padding: 20px;
    margin: 20px 30px;
`

const UserInfo = styled.p`
    font-weight: bold;
    font-size: 18px;
    margin: 10px;
    color: ${style.charcoal};
`

const UserEmail = styled.p`
    font-size: 18px;
    margin: 10px;
    color: ${style.black};
`

const Placeholder = styled.div`
    background-color: ${style.skyblue};
    color: white;
    height: 100px;
    width: 100px;
    font-size: 80px;
    padding: 10px;
    text-align: center;
    border-radius: 70px;
    margin: 20px auto;
`

const Img = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 70px;
    margin: 10px auto;
`

const Button = styled.button`
    width: 70%;
    color: ${style.black};
    font-weight: bold;
    border-radius: 17px;
    margin-top: 0px;
    animation: 0.7s ${button} ease;
`

export default AccountDetails
