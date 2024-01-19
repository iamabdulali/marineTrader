import React from 'react';
import './production.css';

const ProductSection = ({ products }) => {
  const handleClick = (e) => {
    const img = e.target;

    const handleMouseMove = (e) => {
      img.style.left = e.pageX + 'px';
      img.style.top = e.pageY + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    img.addEventListener('mouseout', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  return (
    <section className="product-section">
      <div className="row-1">
        <h2>In The Spotlight</h2>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img className="image"src={product.image} alt={product.title} onClick={handleClick} />
            <div className="product-info">
              <span className="category">{product.category}</span>
              <h3 className="title">{product.title}</h3>
              <span className="price">£{product.price}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="show-more-btn">Show more</button>
    </section>
  );
};

export default ProductSection;
