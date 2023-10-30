import { Component } from 'react'
import SingleBook from './SingleBook'
import { Col, Form, Row } from 'react-bootstrap'
import CommentArea from './CommentArea'


class BookList extends Component {
  state = {
    searchQuery: '',
    bookAsin: ''
  }

  setStateOfBooklist = (asin) => {
    this.setState({
      bookAsin: asin
    })
  }

  render() {
    console.log(this.state)
    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-2 mt-3">
          <Col>
            <Row>
              {this.props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook book={b} setStateOfBooklist={this.setStateOfBooklist} idOfThisBook={this.state.bookAsin} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col>
            <CommentArea bookAsin={this.state.bookAsin} />
          </Col>
        </Row>
      </>
    )
  }
}

export default BookList
