import React, { useState, useEffect, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { useHistory } from "react-router-dom"
import { AppContext } from "./AppContext"
import style from "./styleConstants"

export const MyMessages = () => {
    const { appUser } = useContext(AppContext)
    const [messages, setMessages] = useState()
    let history = useHistory()

    useEffect(() => {
        fetch(`/account/messages/${appUser.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMessages(data.post)
            })
    }, [appUser])

    console.log(messages)

    return (
        <Wrapper>
            <Title>My Messages</Title>
            {messages && messages.length > 0 && (
                <>
                    {messages.map((message) => {
                        return (
                            <Postbox
                                key={message.postId}
                                onClick={() =>
                                    history.push(
                                        `/user/${appUser.email}/messages/${message.postId}/${message.messageId}`
                                    )
                                }
                            >
                                <p>Re: {message.postTitle}</p>
                            </Postbox>
                        )
                    })}
                </>
            )}
        </Wrapper>
    )
}

const button = keyframes`
  0% {
    background-color:rgb(86, 211, 252, 0.0);   margin: 10px auto;;
  }

  70% {
    background-color: rgb(86, 211, 252, 0.4);   margin: 20px auto;;
  }

  100% {
    background-color: rgb(86, 211, 252, 0.3);   margin: 20px auto;;
  }
`
const Wrapper = styled.div`
    text-align: center;
`

const Title = styled.p`
    font-size: 20px;
    color: ${style.charcoal};
    margin: 20px auto;
`

const Postbox = styled.div`
    width: 80vw;
    margin: 20px auto;
    padding: 10px 20px;
    text-align: left;
    box-shadow: -1px 1px 8px -2px rgb(4, 95, 181, 0.5);
    border-radius: ${style.radius};
    color: ${style.black};
    background-color: rgb(86, 211, 252, 0.3);
    font-weight: bold;
    animation: 0.7s ${button} ease;
    cursor: pointer;
`

export default MyMessages
