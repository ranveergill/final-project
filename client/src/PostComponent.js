import React from "react"
import styled, { keyframes } from "styled-components"
import { useHistory } from "react-router-dom"
import style from "./styleConstants"

export const PostComponent = (props) => {
    let history = useHistory()
    const { title, location, content, imageSrc, postId, timestamp, editedOn } =
        props

    console.log(postId)
    return (
        <Wrapper key={postId} onClick={() => history.push(`/posts/${postId}`)}>
            <Title>{title}</Title>
            <Image src={imageSrc} />
            <Content>{content.slice(0, 50)}...</Content>
            {timestamp !== editedOn ? (
                <Timestamp>
                    Edited on {editedOn} in {location}
                </Timestamp>
            ) : (
                <Timestamp>
                    Posted on {timestamp} in {location}
                </Timestamp>
            )}
        </Wrapper>
    )
}

const fadeIn = keyframes`
  0% {
    box-shadow: 0px 0px 0px 0px ${style.black};  margin: 20px 19px;
  }
  100% {
    box-shadow: -1px 1px 8px -2px rgb(4, 95, 181, 0.5);  margin: 14px 20px;
  }
`

const Wrapper = styled.div`
    padding: 10px;

    margin: 14px 20px;
    box-shadow: -1px 1px 8px -2px rgb(4, 95, 181, 0.5);
    color: ${style.charcoal};
    border-radius: ${style.radius};
    display: grid;
    animation: 1s ${fadeIn} ease;
    grid-template-columns: 30% 70%;
    grid-template-rows: 30px 60px 20px;
    grid-template-areas:
        "pic title "
        "pic cont "
        "timestamp timestamp ";
`

const Title = styled.p`
    font-weight: bold;
    grid-area: title;
`

const Timestamp = styled.p`
    grid-area: timestamp;
    font-size: 12px;
`

const Content = styled.p`
    grid-area: cont;
    font-size: 16px;
`
const Image = styled.img`
    width: 60px;
    height: 60px;
    margin: 3px;
    border-radius: 40px;
    opacity: 0.7;
    grid-area: pic;
`

export default PostComponent
