import React, { useState, useEffect, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { useParams } from "react-router-dom"
import { AppContext } from "./AppContext"
import style from "./styleConstants"

export const MessageDetails = () => {
    const { appUser } = useContext(AppContext)
    const [messages, setMessages] = useState()
    const params = useParams()
    const messageId = params.messageId
    const postId = params.postId

    useEffect(() => {
        fetch(`/account/messages/${appUser.email}/re/${postId}/${messageId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMessages(data.post)
            })
    }, [appUser, postId, messageId])

    return (
        <>
            {messages && messages.length > 0 && (
                <Wrapper>
                    <Title>Re: {messages[0].postTitle}</Title>
                    {messages.map((message) => {
                        return (
                            <Postbox key={message.postId}>
                                <p> {message.message}</p>
                                <Reply>
                                    <a href={`mailto:${message.senderEmail}`}>
                                        Reply by Email
                                    </a>
                                </Reply>
                            </Postbox>
                        )
                    })}
                </Wrapper>
            )}
        </>
    )
}

const fadeIn = keyframes`
  0% {
    box-shadow:-1px 1px 8px -2px rgb(4, 95, 181, 0.8); margin: 10px 5px;
  }
  
  100% {
    box-shadow: 0px 0px 0px 0px rgb(4, 95, 181, 0.0); margin: 5px 5px;
  }
`

const Wrapper = styled.div`
    margin: 20px 10vw 20px 10vw;
`

const Title = styled.div`
    text-align: center;
    font-size: 20px;
    color: ${style.charcoal};
    margin: 20px auto;
`

const Postbox = styled.div`
    padding: 10px;
    margin: 5px 5px;
    padding-top: 20px;
    border: 1px solid ${style.black};
    border-radius: ${style.radius};
    animation: 1s ${fadeIn} ease;
`

const Reply = styled.div`
    background-color: ${style.black};
    color: ${style.white};
    padding: 15px;
    margin-top: 20px;
    border-radius: ${style.radius};
    cursor: pointer;
`

export default MessageDetails
