// MobileCategoryMenu.js



import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import './MobileCategoryMenu.css';

import jetskiIcon from '../../assets/jetski.svg';
import boatHomeIcon from '../../assets/boatHome.svg';
import commercialIcon from '../../assets/commercial.svg';
import motorYachtIcon from '../../assets/motor-yatch.svg';
import sailboatIcon from '../../assets/sailboat.svg';
import smallcraftIcon from '../../assets/smallcraft.svg';
import fishingIcon from '../../assets/fishing.svg';
import ribIcon from '../../assets/rib.svg';
import nonMotorIcon from '../../assets/non-motor.svg';

const MobileCategoryMenu = ({ categories, onCategoryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    handleToggleMenu(); // Close the menu after selection
    onCategoryClick(category);
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setIsMenuOpen(isMobile);
  }, []);

  return (
    <div className={`mobile-category-menu ${isMenuOpen ? 'open' : ''}`}>
      <button onClick={handleToggleMenu}>Categories</button>
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`category-item ${category === selectedCategory ? 'selected' : ''}`}
          >
            <span className="category-icon">{getCategoryIcon(category)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCategoryMenu;