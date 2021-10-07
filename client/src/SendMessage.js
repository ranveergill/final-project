import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { AppContext } from "./AppContext"
import style from "./styleConstants"
import { v4 as uuidv4 } from "uuid"

export const SendMessage = () => {
    const history = useHistory()
    const { appUser } = useContext(AppContext)
    const [post, setPost] = useState(null)
    const [message, setMessage] = useState({ messageId: uuidv4() })
    const params = useParams()
    const postId = params.postId

    console.log(message)

    useEffect(() => {
        fetch(`/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data.post)
            })
        return
    }, [postId, appUser])

    const handleChange = (value, name) => {
        setMessage({
            ...message,
            [name]: value,
            senderEmail: appUser.email,
            posterEmail: post.userEmail,
            postId: postId,
            postTitle: post.title,
        })
    }

    const sendMessage = () => {
        fetch(`/sendmessage`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        }).then(history.push(`/posts/${postId}`))
    }

    return (
        <Wrapper>
            {post && (
                <Wrapper>
                    <Title>Re:{post.title}</Title>
                    <ContentBox
                        type="text"
                        name="content"
                        rows="5"
                        onChange={(ev) =>
                            handleChange(ev.target.value, "message")
                        }
                    />
                    <Button onClick={sendMessage}>Send</Button>
                </Wrapper>
            )}
        </Wrapper>
    )
}

const button = keyframes`
  0% {
    background-color:rgb(86, 211, 252, 0.0); margin-top: 6px;
  }

  100% {
    background-color: rgb(86, 211, 252, 0.2); margin-top: 0px;
  }
`

const Wrapper = styled.div`
    text-align: center;
`

const Title = styled.p`
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
`
const ContentBox = styled.textarea`
    display: block;
    border-radius: ${style.radius};
    background-color: white;
    margin: 10px 5px;
    padding: 10px;
    font-family: sans-serif;
    width: 80vw;
    margin: 20px auto;
`

const Button = styled.button`
    width: 70%;
    color: ${style.black};
    background-color: rgb(86, 211, 252, 0.2);
    font-weight: bold;
    border-radius: 17px;
    margin-top: 0px;
    animation: 0.7s ${button} ease;
`

export default SendMessage
