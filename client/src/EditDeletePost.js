import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import moment from "moment"
import { AppContext } from "./AppContext"
import style from "./styleConstants"

const time = moment().format("MMMM DD YYYY, h:mm a")

export const Edit = () => {
    const history = useHistory()
    const { appUser } = useContext(AppContext)
    const [post, setPost] = useState()
    const [formData, setFormData] = useState()
    const params = useParams()
    const postId = params.postId

    console.log(formData)
    console.log(time)
    useEffect(() => {
        fetch(`/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data.post)
            })
    }, [])

    const handleChange = (value, name) => {
        setFormData({ ...formData, [name]: value, editedOn: time })
    }

    const handleDelete = () => {
        fetch(`/posts/${postId}/delete`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            //   body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                window.alert(`post ${postId} has been deleted`)
            })
            .then(history.push(`/user/${appUser.email}`))
    }

    const handleUpdate = () => {
        fetch(`/posts/${postId}/update`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
            })
            .then(history.push(`/user/${appUser.email}`))
    }

    return (
        <Wrapper>
            {post && (
                <UpdateForm>
                    <Title>Update/Delete Post</Title>
                    <Timestamp>Posted on {post.timestamp}</Timestamp>
                    {post.imageURL && <Img src={post.imageURL} />}
                    <Radio>
                        <input
                            onChange={(ev) =>
                                handleChange(ev.target.value, "seeking")
                            }
                            type="radio"
                            id="seeking1"
                            name="Seeking"
                            value="seeking"
                        />
                        <LabelRad for="seeking1">Seeking</LabelRad>
                    </Radio>
                    <Radio>
                        <input
                            onChange={(ev) =>
                                handleChange(ev.target.value, "seeking")
                            }
                            type="radio"
                            id="seeking2"
                            name="Seeking"
                            value="offering"
                        />
                        <LabelRad for="seeking2">Offering</LabelRad>
                    </Radio>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        name="Title"
                        onChange={(ev) =>
                            handleChange(ev.target.value, "title")
                        }
                        placeholder={post.title}
                    />
                    <Label htmlFor="content">Content</Label>
                    <ContentBox
                        type="text"
                        name="content"
                        rows="5"
                        placeholder={post.content}
                        onChange={(ev) =>
                            handleChange(ev.target.value, "content")
                        }
                    />
                    <Label htmlFor="content">Location</Label>
                    <Input
                        type="text"
                        name="location"
                        placeholder={post.location}
                        onChange={(ev) =>
                            handleChange(ev.target.value, "location")
                        }
                    />

                    <Label htmlFor="category">Category</Label>
                    <Select
                        type="dropdown"
                        name="category"
                        onChange={(ev) =>
                            handleChange(ev.target.value, "category")
                        }
                    >
                        <option value="" disabled selected>
                            Choose one
                        </option>
                        <option value="sportsandfitness">
                            Sports & Fitness
                        </option>
                        <option value="foodanddrink">Food & Drink</option>
                        <option value="artandcraft">Art & Craft</option>
                        <option value="homeandgarden">Home & Garden</option>
                        <option value="computersandtechnology">
                            Computers & Technology
                        </option>
                        <option value="other">Other</option>
                    </Select>
                    <Button onClick={handleUpdate}>Update Post</Button>
                    <DeleteButton onClick={handleDelete}>
                        Delete Post
                    </DeleteButton>
                </UpdateForm>
            )}
        </Wrapper>
    )
}

const up = keyframes`
  0% {
    margin: 10px 10px 10px 10px;
  }

  100% {
    margin: 20px 10px 10px 10px;
  }
`

const Wrapper = styled.div`
    margin: 30px 10vw;
`

const Title = styled.div`
    text-align: center;
    margin: 20px;
    color: ${style.charcoal};
    font-size: 18px;
`

const Timestamp = styled.div`
    text-align: center;
    margin: 10px;
    color: ${style.charcoal};
    font-size: 16px;
`

const UpdateForm = styled.div``

const Radio = styled.div`
    margin: 20px;
    display: inline;
    color: ${style.charcoal};
`
const LabelRad = styled.label``

const ContentBox = styled.textarea`
    display: block;
    border: 1px solid black;
    border-radius: ${style.radius};
    margin: 10px 5px;
    padding: 8px;
    font-family: sans-serif;
    width: 95%;
    background-color: ${style.lightblue};
    &:focus {
        background-color: white;
    }
`

const Select = styled.select`
    display: block;
    border-radius: ${style.radius} 0 0 ${style.radius};
    margin: 10px 5px;
    height: 30px;
    width: 95%;
    font-size: 16px;
    padding-left: 8px;
    background-color: ${style.lightblue};
    &:focus {
        background-color: white;
    }
`

const Label = styled.label`
    display: block;
    margin: 20px 10px 10px 10px;
    color: ${style.charcoal};
    animation: 0.7s ${up} ease;
`

const Input = styled.input`
    display: block;
    border-radius: ${style.radius};
    margin: 10px 5px;
    height: 30px;
    width: 95%;
    padding: 8px;
    font-family: sans-serif;
    border: 1px solid black;
    background-color: ${style.lightblue};
    &:focus {
        background-color: white;
    }
`

const Button = styled.button`
    padding: 8px 15px;
    width: 70vw;
    text-align: center;
`

const DeleteButton = styled.button`
    background-color: red;
    border: 2px solid red;
    padding: 8px 15px;
    color: white;
    width: 70vw;
    text-align: center;
    margin-bottom: 40px;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
    display: block;
    object-fit: cover;
    margin: 20px auto;
    border-radius: ${style.radius};
`

export default Edit
