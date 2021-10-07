import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { AppContext } from "./AppContext"
import { useHistory } from "react-router-dom"
import style from "./styleConstants"

export const PostDetails = () => {
    const history = useHistory()
    const { appUser } = useContext(AppContext)
    const [post, setPost] = useState({ title: null })
    const [likeData, setLikeData] = useState()
    const params = useParams()
    const postId = params.postId

    useEffect(() => {
        setLikeData({
            ...likeData,
            postId: postId,
            userEmail: appUser.email,
            title: post.title,
        })
    }, [post, appUser, postId])

    useEffect(() => {
        fetch(`/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data.post)
            })
        return
    }, [postId])

    const likePost = () => {
        fetch(`/likepost`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likeData),
        })
    }

    console.log(post.image)
    return (
        <Wrapper>
            {post && (
                <>
                    <Title>{post.title}</Title>
                    <Img src={post.imageURL} />
                    <p>{post.content}</p>
                    <Timestamp>
                        {post.timestamp} in <Bold>{post.location}</Bold>
                    </Timestamp>
                    <Timestamp>
                        Posted by <Bold>{post.userId}</Bold>
                    </Timestamp>
                    {post.timestamp !== post.editOn && (
                        <Timestamp>Edited on {post.editedOn}</Timestamp>
                    )}
                    <Button
                        onClick={() =>
                            history.push(`/posts/${post.postId}/message`)
                        }
                    >
                        Reply
                    </Button>
                    <Button onClick={likePost}>Favorite</Button>
                </>
            )}
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
    background-color:rgb(86, 211, 252, 0.0); margin-top: 20px;
  }

  70% {
    background-color: rgb(86, 211, 252, 0.4); margin-top: 10px;
  }

  100% {
    background-color: rgb(86, 211, 252, 0.3); margin-top: 10px;
  }
`

const Wrapper = styled.div`
    color: ${style.charcoal};
    margin: 0px 10vw 20px 10vw;
    text-align: center;
    box-shadow: 2px 2px 8px -2px rgb(4, 95, 181, 0.8);
    animation: 1s ${fadeIn} ease;
    border-radius: ${style.radius};
    padding: 20px;
    margin: 20px 30px;
`

const Img = styled.img`
    width: 60vw;
    border-radius: 20px;
    margin: 15px;
`

const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
`

const Timestamp = styled.p`
    font-size: 12px;
    color: ${style.black};
    margin: 15px 0px;
`

const Button = styled.button`
    width: 40%;
    padding: 8px;
    color: ${style.black};
    font-weight: bold;
    display: inline;
    border-radius: 17px;
    margin-top: 10px;
    animation: 0.7s ${button} ease;
`

const Bold = styled.span`
    font-weight: bold;
    color: ${style.charcoal};
`

export default PostDetails
