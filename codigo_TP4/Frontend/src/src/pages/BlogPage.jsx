import React from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData.js'; // Importa nossos posts
import './BlogPage.css'; // Vamos criar este CSS

export default function BlogPage() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Notícias e artigos sobre saúde e vacinação</p>
      </div>

      <div className="blog-posts-grid">
        {blogData.map((post) => (
          <div className="post-card" key={post.id}>
            <img src={post.imageUrl} alt={post.title} className="post-card-image" />
            <div className="post-card-content">
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <Link to={`/blog/${post.id}`} className="read-more-button">
                Leia Mais &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}