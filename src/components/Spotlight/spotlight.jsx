import React from 'react';
import ProductSection from './production';
import ship1 from '../../assets/product_images/ship1.png';
import ship2 from '../../assets/product_images/ship2.png';

const spotlight = () => {
  const products = [
    { id: 1, image: ship1, category: 'Yacht', title: 'Princess 72 Elite', price: 55000000 },
    { id: 2, image: ship2, category: 'Yacht', title: 'Princess 73 Elite', price: 56000000 },
    { id: 1, image: ship1, category: 'Yacht', title: 'Princess 72 Elite', price: 55000000 },
    { id: 2, image: ship2, category: 'Yacht', title: 'Princess 73 Elite', price: 56000000 },
    { id: 1, image: ship1, category: 'Yacht', title: 'Princess 72 Elite', price: 55000000 },
    { id: 2, image: ship2, category: 'Yacht', title: 'Princess 73 Elite', price: 56000000 },
    { id: 1, image: ship1, category: 'Yacht', title: 'Princess 72 Elite', price: 55000000 },
    { id: 2, image: ship2, category: 'Yacht', title: 'Princess 73 Elite', price: 56000000 },
    { id: 1, image: ship1, category: 'Yacht', title: 'Princess 72 Elite', price: 55000000 },
    { id: 2, image: ship2, category: 'Yacht', title: 'Princess 73 Elite', price: 56000000 },
    { id: 1, image: ship1, category: 'Yacht', title: 'Princess 72 Elite', price: 55000000 },
    { id: 2, image: ship2, category: 'Yacht', title: 'Princess 73 Elite', price: 56000000 },
    
  ];

  return (
    <div className="home">
      <ProductSection products={products} />
    </div>
  );
};

export default spotlight;