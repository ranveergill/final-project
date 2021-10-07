import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import PostComponent from "./PostComponent"
import style from "./styleConstants"

export const PostsBySeeking = () => {
    const params = useParams()
    const seeking = params.seeking
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch(`/posts/type/${seeking}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPosts(data.post)
            })
    }, [])

    return (
        <Wrapper>
            {posts && posts.length > 0 ? (
                <>
                    <Text>
                        Posts in{" "}
                        {seeking === "seeking" ? "Seeking" : "Offering"}
                    </Text>
                    {Object.values(posts)
                        .sort((a, b) => {
                            if (b.timestamp > a.timestamp) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                        .map((post) => {
                            return (
                                <>
                                    <PostComponent
                                        postId={post.postId}
                                        title={post.title}
                                        location={post.location}
                                        content={post.content}
                                        imageSrc={post.imageURL}
                                        userId={post.userId}
                                        timestamp={post.timestamp}
                                        editedOn={post.editedOn}
                                    />
                                </>
                            )
                        })}
                </>
            ) : (
                <Text>
                    no posts in {seeking === "seeking" ? "Seeking" : "Offering"}
                </Text>
            )}
            <Text>
                End of Posts in {seeking === "seeking" ? "Seeking" : "Offering"}
            </Text>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Text = styled.p`
    color: ${style.black};
    opacity: 0.8;
    margin: 20px 30px;
`

export default PostsBySeeking
