import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../data/blogData.js';
import './BlogPostPage.css'; // Vamos criar este CSS

export default function BlogPostPage() {
  const { postId } = useParams(); // Pega o 'id' da URL
  const post = blogData.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="blog-post-container">
        <h2>Post não encontrado</h2>
        <Link to="/blog" className="back-link">&larr; Voltar para o Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <Link to="/blog" className="back-link">&larr; Voltar para o Blog</Link>
      
      <h1>{post.title}</h1>
      
      <img src={post.imageUrl} alt={post.title} className="post-header-image" />
      
      {/* dangerouslySetInnerHTML é usado para renderizar o HTML do nosso 'fullContent' */}
      <div 
        className="post-content" 
        dangerouslySetInnerHTML={{ __html: post.fullContent }} 
      />
    </div>
  );
}