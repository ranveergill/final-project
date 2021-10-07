import React, { useState, useEffect } from "react"
import styled from "styled-components"
import PostComponent from "./PostComponent"
import style from "./styleConstants"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState()

    useEffect(() => {
        fetch("/allposts")
            .then((res) => res.json())
            .then((data) => {
                const postArr = Object.values(data.data)
                setAllPosts(postArr)
            })
    }, [])

    return (
        <Wrapper>
            <Text>All Posts</Text>
            {allPosts && allPosts.length > 0 ? (
                Object.values(allPosts)
                    .sort((a, b) => {
                        if (b.editedOn > a.editedOn) {
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
                    })
            ) : (
                <div>No Posts</div>
            )}
            <Text>End of Posts</Text>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Text = styled.p`
    color: ${style.black};
    opacity: 0.8;
    margin: 20px 30px;
`

export default AllPosts
