import React, { useState } from "react";
import { Card, Accordion, Form, Button, ListGroup, Badge } from "react-bootstrap";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const Kwh = () => {
  const [posts, setPosts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newArticle, setNewArticle] = useState("");
  const [file, setFile] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [comments, setComments] = useState({});
  const [mostHelpful, setMostHelpful] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddPost = () => {
    if (newPost.trim() || codeSnippet.trim() || file) {
      const newPostObj = {
        id: posts.length + 1,
        content: newPost,
        code: codeSnippet,
        file,
        timestamp: new Date().toLocaleString(),
      };
      setPosts([...posts, newPostObj]);
      setNewPost("");
      setFile(null);
      setCodeSnippet("");
    }
  };

  const handleAddArticle = () => {
    if (newArticle.trim()) {
      const newArticleObj = {
        id: articles.length + 1,
        content: newArticle,
        timestamp: new Date().toLocaleString(),
        reactions: 0,
      };
      setArticles([...articles, newArticleObj]);
      setNewArticle("");
    }
  };

  const handleReactToArticle = (id) => {
    const updatedArticles = articles.map((article) =>
      article.id === id ? { ...article, reactions: article.reactions + 1 } : article
    );
    setArticles(updatedArticles);
  };

  const filteredArticles = articles.filter((article) =>
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Knowledge Widget Hub</h1>

      {/* Code Sharing Section */}
      <div className="mb-5">
        <h3>Code Debugging & Sharing</h3>
        <Form className="mb-3">
          <Form.Group>
            <Form.Label>Post a Request or Solution</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Describe your issue or share a helpful solution..."
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Code Snippet (optional)</Form.Label>
            <CodeMirror
              value={codeSnippet}
              options={{
                mode: "javascript",
                theme: "material",
                lineNumbers: true,
              }}
              onBeforeChange={(editor, data, value) => setCodeSnippet(value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Upload a File (optional)</Form.Label>
            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>
          <Button variant="primary" className="mt-3" onClick={handleAddPost}>
            Post
          </Button>
        </Form>
        <ListGroup>
          {posts.length > 0 ? (
            posts.map((post) => (
              <ListGroup.Item key={post.id}>
                <strong>{post.timestamp}</strong>: {post.content}
                {post.code && (
                  <CodeMirror
                    value={post.code}
                    options={{
                      mode: "javascript",
                      theme: "material",
                      readOnly: true,
                      lineNumbers: true,
                    }}
                  />
                )}
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-muted">No posts yet. Be the first to contribute!</p>
          )}
        </ListGroup>
      </div>

      {/* Knowledge Sharing Section */}
      <div className="mb-5">
        <h3>Knowledge Sharing Hub</h3>
        <Form className="mb-3">
          <Form.Group>
            <Form.Label>Share Knowledge (Article or Guide)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newArticle}
              onChange={(e) => setNewArticle(e.target.value)}
              placeholder="Write an article or guide to share your knowledge..."
            />
          </Form.Group>
          <Button variant="success" className="mt-3" onClick={handleAddArticle}>
            Share Article
          </Button>
        </Form>

        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>

        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Card key={article.id} className="mb-3">
              <Card.Body>
                <Card.Text>{article.content}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">{article.timestamp}</small>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="float-end"
                    onClick={() => handleReactToArticle(article.id)}
                  >
                    👍 {article.reactions}
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-muted">No articles found. Share the first one!</p>
        )}
      </div>
    </div>
  );
};

export default Kwh;
