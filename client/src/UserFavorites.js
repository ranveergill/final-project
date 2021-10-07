import React, { useState, useEffect, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { AppContext } from "./AppContext"
import { useHistory } from "react-router-dom"
import style from "./styleConstants"

export const UserFavorites = () => {
    const { appUser } = useContext(AppContext)
    const [posts, setPosts] = useState()
    let history = useHistory()

    useEffect(() => {
        fetch(`/account/favorites/${appUser.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPosts(data.post)
            })
    }, [appUser])

    console.log(posts)

    return (
        <>
            <Title>My Favorites</Title>
            {posts && posts.length > 0 && (
                <Wrapper>
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
                                <Postbox
                                    key={post.postId}
                                    onClick={() =>
                                        history.push(
                                            `/posts/${post.postId}/liked`
                                        )
                                    }
                                >
                                    <p>{post.title}</p>
                                </Postbox>
                            )
                        })}
                </Wrapper>
            )}
        </>
    )
}

const button = keyframes`
  0% {
    background-color:rgb(86, 211, 252, 0.0);   margin: 30px auto;;
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
    color: ${style.black};
    background-color: rgb(86, 211, 252, 0.3);
    font-weight: bold;
    animation: 0.7s ${button} ease;
`

export default UserFavorites
