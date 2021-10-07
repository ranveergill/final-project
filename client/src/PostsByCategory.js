import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import styled from "styled-components"
import PostComponent from "./PostComponent"
import style from "./styleConstants"

export const PostsByCategory = () => {
    const params = useParams()
    const category = params.category
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch(`/posts/bycategory/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.post)
            })
    }, [])

    return (
        <Wrapper>
            {posts && posts.length > 0 ? (
                <>
                    <Text>
                        Posts in{" "}
                        {category === "artandcraft"
                            ? "Art and Craft"
                            : category === "other"
                            ? "Other"
                            : category === "homeandgarden"
                            ? "Home and Garden"
                            : category === "foodanddrink"
                            ? "Food and Drink"
                            : category === "computersandtechnology"
                            ? "Computers and Technology"
                            : "Sports and Fitness"}
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
                    No Posts in{" "}
                    {category === "artandcraft"
                        ? "Art and Craft"
                        : category === "other"
                        ? "Other"
                        : category === "homeandgarden"
                        ? "Home and Garden"
                        : category === "foodanddrink"
                        ? "Food and Drink"
                        : category === "computersandtechnology"
                        ? "Computers and Technology"
                        : "Sports and Fitness"}
                </Text>
            )}
            <Text>
                End of Posts in{" "}
                {category === "artandcraft"
                    ? "Art and Craft"
                    : category === "other"
                    ? "Other"
                    : category === "homeandgarden"
                    ? "Home and Garden"
                    : category === "foodanddrink"
                    ? "Food and Drink"
                    : category === "computersandtechnology"
                    ? "Computers and Technology"
                    : "Sports and Fitness"}
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

export default PostsByCategory
