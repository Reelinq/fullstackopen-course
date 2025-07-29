CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
('testBlogAuthor', 'https://testBlogUrl.com', 'testBlog', 1);

INSERT INTO blogs (author, url, title, likes) VALUES 
('testBlogAuthor1', 'https://testBlogUrl1.com', 'testBlog1', 2);