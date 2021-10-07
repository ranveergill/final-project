import React, { useState, useEffect, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { AppContext } from "./AppContext"
import { useHistory } from "react-router-dom"
import style from "./styleConstants"

export const MyPosts = () => {
    const { appUser } = useContext(AppContext)
    const [posts, setPosts] = useState()
    let history = useHistory()

    useEffect(() => {
        fetch(`/account/posts/${appUser.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPosts(data.post)
            })
    }, [appUser])

    return (
        <>
            {posts && posts.length > 0 ? (
                <Wrapper>
                    <Title>My Posts</Title>
                    {Object.values(posts)
                        .sort((a, b) => {
                            if (b.editedOn > a.editedOn) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                        .map((post) => {
                            return (
                                <Postbox key={post.postId}>
                                    <Ptitle>{post.title}</Ptitle>
                                    <p>{post.content}</p>
                                    <Timestamp>{post.timestamp}</Timestamp>
                                    {post.timestamp !== post.editedOn && (
                                        <Timestamp>
                                            Edited on {post.editedOn}
                                        </Timestamp>
                                    )}
                                    <Edit
                                        onClick={() =>
                                            history.push(
                                                `/user/${appUser.email}/${post.postId}/edit`
                                            )
                                        }
                                    >
                                        Edit/Delete
                                    </Edit>
                                </Postbox>
                            )
                        })}
                </Wrapper>
            ) : (
                <Title>You Currently Have No Posts</Title>
            )}
        </>
    )
}

const button = keyframes`
  0% {
    background-color:rgb(86, 211, 252, 0.3);   margin: 30px auto;;
  }

  100% {
    background-color: rgb(86, 211, 252, 0.0);   margin: 20px auto;;
  }
`

const Wrapper = styled.div`
    margin: 20px 10vw 20px 10vw;
`

const Title = styled.div`
    text-align: center;
    font-size: 20px;
    color: ${style.charcoal};
`

const Postbox = styled.div`
    width: 80vw;
    margin: 20px auto;
    padding: 10px 20px;
    text-align: left;
    box-shadow: -1px 1px 8px -2px rgb(4, 95, 181, 0.5);
    border-radius: ${style.radius};
    color: ${style.charcoal};
    background-color: transparent;
    border: 1px solid ${style.black};
    font-weight: bold;
    animation: 0.7s ${button} ease;
`

const Ptitle = styled.div`
    text-align: center;
    margin: 15px;
    font-weight: bold;
    font-size: 18px;
`

const Edit = styled.p`
    margin: 10px auto;
    padding: 7px;
    border: 2px solid rgb(207, 27, 14);
    color: rgb(207, 27, 14);
    font-weight: bold;
    border-radius: ${style.radius};
    cursor: pointer;
`

const Timestamp = styled.div`
    opacity: 0.8;
    margin: 20px;
    font-weight: lighter;
`

export default MyPosts
