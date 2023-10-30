import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.bookAsin !== this.props.bookAsin) {

      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' +
          this.props.bookAsin,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNmYTcyOGIzOTczNDAwMTRkNWU4MDAiLCJpYXQiOjE2OTg2NzAzNzcsImV4cCI6MTY5OTg3OTk3N30.quaSko70rZ2JV28WjIP5Bn4IkfW2fyD_dGQzF9d9GHQ',
            },
          }
        )
        console.log(response)
        if (response.ok) {
          let comments = await response.json()
          this.setState({ comments: comments, isLoading: false, isError: false })
        } else {
          this.setState({ isLoading: false, isError: true })
        }
      } catch (error) {
        console.log(error)
        this.setState({ isLoading: false, isError: true })
      }
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    )
  }
}

export default CommentArea
