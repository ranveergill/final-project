import React, { useContext, useState, useEffect } from "react"
import moment from "moment"
import { useHistory } from "react-router-dom"

import { v4 as uuidv4 } from "uuid"
import { AppContext } from "./AppContext"
import styled, { keyframes } from "styled-components"
import style from "./styleConstants"
import { storage } from "./firebase"

const time = moment().format("MMMM DD YYYY, h:mm a")

const initialState = {
    title: "",
    content: "",
    location: "",
    timestamp: time,
    userId: "",
    userEmail: "",
    imageURL: "",
    postId: "",
    seeking: "",
    category: "",
    editedOn: time,
    isUploading: false,
    progress: 0,
}

export const PostForm = () => {
    const history = useHistory()

    const [formData, setFormData] = useState(initialState)

    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [imageurl, setImageurl] = useState(null)
    const { appUser } = useContext(AppContext)

    console.log(appUser)

    console.log(formData)

    const handleChange = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }

    const postAd = () => {
        const basicData = {
            ...formData,
            userId: appUser.displayName,
            userEmail: appUser.email,
            imageURL: imageurl,
            postId: uuidv4(),
        }
        console.log(basicData)
        fetch(`/posted`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(basicData),
        }).then(history.push(`/all`))
    }

    const handleImgChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    console.log("image: ", image)

    const handleImgUpload = (event) => {
        event.preventDefault()
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        console.log(1)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setImageurl(url)
                    })
            }
        )
    }

    console.log(imageurl)

    // useEffect(() => {
    //   setFormData({ ...formData, imageURL: imageurl });
    // }, [imageurl]);

    return (
        <Form>
            <Title>Create Post</Title>
            <Radio>
                <input
                    onChange={(ev) => handleChange(ev.target.value, "seeking")}
                    type="radio"
                    id="seeking1"
                    name="Seeking"
                    value="seeking"
                />
                <LabelRad htmlFor="seeking1">Seeking</LabelRad>
            </Radio>
            <Radio>
                <input
                    onChange={(ev) => handleChange(ev.target.value, "seeking")}
                    type="radio"
                    id="seeking2"
                    name="Seeking"
                    value="offering"
                />
                <LabelRad htmlFor="seeking2">Offering</LabelRad>
            </Radio>

            <Label htmlFor="title">Title</Label>
            <Input
                type="text"
                name="Title"
                onChange={(ev) => handleChange(ev.target.value, "title")}
            />
            <Label htmlFor="content">Content</Label>
            <ContentBox
                type="text"
                name="content"
                rows="5"
                onChange={(ev) => handleChange(ev.target.value, "content")}
            />
            <Label htmlFor="content">Location</Label>
            <Input
                type="text"
                name="location"
                onChange={(ev) => handleChange(ev.target.value, "location")}
            />

            <Label>Image:</Label>
            <ImgDiv>
                <input type="file" onChange={handleImgChange} />
                {imageurl && <Img src={imageurl} />}
                <progress value={progress} max="100" />
                <Upload onClick={handleImgUpload}>Upload Chosen Image</Upload>
            </ImgDiv>

            <Label htmlFor="category">Category</Label>
            <Select
                type="dropdown"
                name="category"
                onChange={(ev) => handleChange(ev.target.value, "category")}
            >
                {" "}
                <option value="" selected disabled>
                    Select One
                </option>
                <option value="sportsandfitness">Sports & Fitness</option>
                <option value="foodanddrink">Food & Drink</option>
                <option value="artandcraft">Art & Craft</option>
                <option value="homeandgarden">Home & Garden</option>
                <option value="computersandtechnology">
                    Computers & Technology
                </option>
                <option value="other">Other</option>
            </Select>
            <PostBtn onClick={postAd}>Post</PostBtn>
        </Form>
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

const Form = styled.form`
    margin: 30px 10vw;
`

const Title = styled.div`
    text-align: center;
    margin: 20px;
    color: ${style.charcoal};
    font-size: 18px;
`

const Radio = styled.div`
    margin: 20px;
    display: inline;
    color: ${style.charcoal};
`

const Label = styled.label`
    display: block;
    margin: 20px 10px 10px 10px;
    color: ${style.charcoal};
    animation: 0.7s ${up} ease;
`

const LabelRad = styled.label``

const Input = styled.input`
    display: block;
    border-radius: ${style.radius};
    margin: 10px 5px;
    height: 30px;
    padding: 8px;
    font-family: sans-serif;
    width: 95%;
    border: 1px solid black;
    background-color: ${style.lightblue};
    &:focus {
        background-color: white;
    }
`

const ContentBox = styled.textarea`
    display: block;
    border: 1px solid black;
    border-radius: ${style.radius};
    padding: 8px;
    font-family: sans-serif;
    margin: 10px 5px;
    width: 95%;
    background-color: ${style.lightblue};
    &:focus {
        background-color: white;
    }
`

const Img = styled.img`
    width: 100px;
    height: 100px;
    border: 1px solid black;
    object-fit: cover;
    margin: 10px;
    border-radius: ${style.radius};
`

const ImgDiv = styled.div`
    margin: 20px 10px 20px 10px;
`

const Upload = styled.button`
    width: 75vw;
    margin: 10px auto 0px auto;
    background-color: ${style.black};
    color: white;
`

const Select = styled.select`
    display: block;
    border-radius: ${style.radius} 0 0 ${style.radius};
    margin: 10px 5px 25px 5px;
    height: 30px;
    width: 95%;
    font-size: 16px;
    padding-left: 8px;
    background-color: ${style.lightblue};
    &:focus {
        background-color: white;
    }
`

const PostBtn = styled.button`
    background-color: ${style.black};
    color: white;
    float: right;
    margin-bottom: 40px;
`

export default PostForm
