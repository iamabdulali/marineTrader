import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import './CategoryList.css';
import PackageCard from '../Card/packageCard/PackageCard';

import jetskiIcon from '../../assets/jetski.svg';
import boatHomeIcon from '../../assets/boatHome.svg';
import commercialIcon from '../../assets/commercial.svg';
import motorYachtIcon from '../../assets/motor-yatch.svg';
import sailboatIcon from '../../assets/sailboat.svg';
import smallcraftIcon from '../../assets/smallcraft.svg';
import fishingIcon from '../../assets/fishing.svg';
import ribIcon from '../../assets/rib.svg';
import nonMotorIcon from '../../assets/non-motor.svg';

const CategoryList = ({ categories, onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Jet Skis');

  const getCategoryIcon = (category) => {
    const isSelected = category === selectedCategory;
    const strokeColor = isSelected ? 'blue' : 'currentColor';
    const strokeOpacity = isSelected ? '0.5' : '0'; // Adjust this value to make the stroke lighter or darker

    switch (category) {
      case 'Jet Skis':
        return <ReactSVG src={jetskiIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Boat Home':
        return <ReactSVG src={boatHomeIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Commercial':
        return <ReactSVG src={commercialIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Motor/Yacht':
        return <ReactSVG src={motorYachtIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Sailboat':
        return <ReactSVG src={sailboatIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Smallcraft':
        return <ReactSVG src={smallcraftIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Fishing':
        return <ReactSVG src={fishingIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Rib':
        return <ReactSVG src={ribIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      case 'Non-Motor':
        return <ReactSVG src={nonMotorIcon} beforeInjection={svg => { svg.setAttribute('stroke', strokeColor); svg.setAttribute('stroke-opacity', strokeOpacity); }} />;
      default:
        return '🚤';
    }
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category} onClick={() => { onCategoryClick(category); setSelectedCategory(category); }} className={`category-item ${category === selectedCategory ? 'selected' : ''}`}>
          <span className="category-icon">{getCategoryIcon(category)}</span>
        </div>
      ))}
    </div>
  );
};

const DisplayedName = ({ selectedCategory }) => {
  return (
    <div className="displayed-name">
      {selectedCategory ? (
        <h2 style={{ padding: 10, fontSize: '14px', fontWeight: '630', marginLeft: '15px' }}>
          Selected Category:
        </h2>
      ) : (
        <h2 style={{ padding: 10, fontSize: '16px', fontWeight: '600', marginLeft: '15px' }}></h2>
      )}
    </div>
  );
};

const CategoryLists = () => {
  const [selectedCategory, setSelectedCategory] = useState('Jet Skis');

  const categories = [
    'Jet Skis',
    'Boat Home',
    'Commercial',
    'Motor/Yacht',
    'Sailboat',
    'Smallcraft',
    'Fishing',
    'Rib',
    'Non-Motor',
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <DisplayedName selectedCategory={selectedCategory} />
      <CategoryList categories={categories} onCategoryClick={handleCategoryClick} />
      <h2 style={{ paddingLeft:25, fontSize: '16px', fontWeight: '700', alignItems: 'center',paddingTop:'2vh', }}>
        {selectedCategory ? `Packages for: ${selectedCategory}` : ''}
      </h2>

      <div style={{ padding: 20 }}>
        <PackageCard />
      </div>
    </div>
  );
};

export default CategoryLists;
