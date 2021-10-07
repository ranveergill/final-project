import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import GlobalStyles from "./globalStyles"
import Home from "./Home"
import AllPosts from "./AllPosts"
import PostForm from "./PostForm"
import PostDetails from "./PostDetails"
import LikedPost from "./LikedPostDetails"
import AccountDetails from "./AccountDetails"
import PostsByCategory from "./PostsByCategory"
import PostsBySeeking from "./PostsBySeeking"
import SearchPage from "./Search"
import Edit from "./EditDeletePost"
import AppProvider from "./AppContext"
import MyPosts from "./MyPosts"
import UserFavorites from "./UserFavorites"
import MyMessages from "./MyMessages"
import MessageDetails from "./MessageDetails"
import Header from "./Header"
import SendMessage from "./SendMessage"

function App() {
    return (
        <Router>
            <AppProvider>
                <GlobalStyles />
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/all">
                        <AllPosts />
                    </Route>
                    <Route exact path="/search">
                        <SearchPage />
                    </Route>
                    <Route exact path="/createpost">
                        <PostForm />
                    </Route>
                    <Route exact path="/posts/:postId">
                        <PostDetails />
                    </Route>
                    <Route exact path="/posts/:postId/liked">
                        <LikedPost />
                    </Route>
                    <Route exact path="/user/:email">
                        <AccountDetails />
                    </Route>
                    <Route exact path="/user/:email/:postId/edit">
                        <Edit />
                    </Route>
                    <Route exact path="/posts/:postId/message">
                        <SendMessage />
                    </Route>
                    <Route exact path="/user/:email/posts">
                        <MyPosts />
                    </Route>
                    <Route exact path="/user/:email/favorites">
                        <UserFavorites />
                    </Route>
                    <Route exact path="/user/:email/messages">
                        <MyMessages />
                    </Route>
                    <Route
                        exact
                        path="/user/:email/messages/:postId/:messageId"
                    >
                        <MessageDetails />
                    </Route>
                    <Route exact path="/posts/bycategory/:category">
                        <PostsByCategory />
                    </Route>
                    <Route exact path="/posts/type/:seeking">
                        <PostsBySeeking />
                    </Route>
                </Switch>
            </AppProvider>
        </Router>
    )
}

export default App
