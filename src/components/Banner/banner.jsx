import React from "react";
import "./banner.css";
const Banner = () => {
  return (
    <div className="banner">
      <div className="col-1">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start',}}>
    <hr style={{borderTop: '5px solid yellow', width: '5vw', marginRight: '10px'}} />
    <h3>Buy & sell Yacht</h3>
</div>


        <h2>Freedom Is Just An Anchor <span style={{color: 'yellow'}}>Away</span></h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sed
          eaque. Impedit laboriosam iste delectus illum nam magni quaerat,
          corporis velit consequuntur, vitae, tempore fuga maiores quidem
          cupiditate? Earum, odit.
        </p>
      </div>

      
      <div className="col-2">
        <form className="banner-form">
        <div class="row">
    <div class="column">
      <label for="category">Category</label>
      <select id="category" class="dropdown">
        <option value="" disabled selected>Select </option>
        
      </select>
      <label for="model">Model</label>
      <select id="model" class="dropdown">
        <option value="" disabled selected>Select </option>
        
      </select>
      <label for="condition">Condition</label>
      <select id="condition" class="dropdown">
        <option value="" disabled selected>Select </option>
        
      </select>
    </div>
    <div class="column">
      <label for="make">Make</label>
      <select id="make" class="dropdown">
        <option value="" disabled selected>Select</option>
       
      </select>
      <label for="type">Type</label>
      <select id="type" class="dropdown">
        <option value="" disabled selected>Select</option>
        
      </select>
      <label for="year">Year</label>
      <select id="year" class="dropdown">
        <option value="" disabled selected>Select</option>
       
      </select>
    </div>
  </div>
  <button type="submit" class="search-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
