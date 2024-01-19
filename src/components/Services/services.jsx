import React from "react";
import "./services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const ServiceSection = () => {
  return (
    <div className="services_section">
      <div className="services-col-1">
        <h3>What we offer?</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
          necessitatibus aut ut sapiente, nihil ex veritatis omnis quod hic
          dolorem voluptatem optio architecto animi cupiditate repellendus et
          cumque dolore ea?
        </p>
      </div>

      <div className="services-col-2">
        <div className="column1">
          <div className="card">
            <div className="card-heading">
              <FontAwesomeIcon
                icon={faCoffee}
                style={{ marginRight: "10px",marginBottom:'0px',color:'#ffb800'}}
              />
              <h4>Boat marketing</h4>
            </div>

            <p>
              The MarineTrader platform is designed to promote your boat
              directly to those who want to buy using the latest technology.
              Every boat is featured on our homepage as well as listed in the
              easy-to-search inventory.
            </p>
          </div>
          <div className="card">
            <div className="card-heading">
              <FontAwesomeIcon
                icon={faCoffee}
                style={{ marginRight: "10px",marginBottom:'0px',color:'#ffb800'}}
              />
              <h4>Boat marketing</h4>
            </div>

            <p>
              The MarineTrader platform is designed to promote your boat
              directly to those who want to buy using the latest technology.
              Every boat is featured on our homepage as well as listed in the
              easy-to-search inventory.
            </p>
          </div>

          <div className="card">
            <div className="card-heading">
              <FontAwesomeIcon
                icon={faCoffee}
                style={{ marginRight: "10px",marginBottom:'0px',color:'#ffb800'}}
              />
              <h4>Boat marketing</h4>
            </div>

            <p>
              The MarineTrader platform is designed to promote your boat
              directly to those who want to buy using the latest technology.
              Every boat is featured on our homepage as well as listed in the
              easy-to-search inventory.
            </p>
          </div>

        </div>

        <div className="column2">
        <div className="card">
            <div className="card-heading">
              <FontAwesomeIcon
                icon={faCoffee}
                style={{ marginRight: "10px",marginBottom:'0px',color:'#ffb800'}}
              />
              <h4>Boat marketing</h4>
            </div>

            <p>
              The MarineTrader platform is designed to promote your boat
              directly to those who want to buy using the latest technology.
              Every boat is featured on our homepage as well as listed in the
              easy-to-search inventory.
            </p>
          </div>
          <div className="card">
            <div className="card-heading">
              <FontAwesomeIcon
                icon={faCoffee}
                style={{ marginRight: "10px",marginBottom:'0px',color:'#ffb800'}}
              />
              <h4>Boat marketing</h4>
            </div>

            <p>
              The MarineTrader platform is designed to promote your boat
              directly to those who want to buy using the latest technology.
              Every boat is featured on our homepage as well as listed in the
              easy-to-search inventory.
            </p>
          </div>
          <div className="card">
            <div className="card-heading">
              <FontAwesomeIcon
                icon={faCoffee}
                style={{ marginRight: "10px",marginBottom:'0px',color:'#ffb800'}}
              />
              <h4>Boat marketing</h4>
            </div>

            <p>
              The MarineTrader platform is designed to promote your boat
              directly to those who want to buy using the latest technology.
              Every boat is featured on our homepage as well as listed in the
              easy-to-search inventory.
            </p>
          </div>

         
          
    
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
