import React from "react";
import "../General.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="generalPage homePage">
      <h3>My final project - Snir Agi</h3>
      <div className="d-flex align-items-center justify-content-center gap-1 flex-column">
        <span>
          I'm snir agi, I studied in HackerU in a course called .NET software
          development, in the course we gained a lot of knowledge from the Full
          Stack world. In the course we experienced and learned a lot, whether
          it was small tasks or large projects. This project basically
          summarizes and tells the whole path we went through and everything we
          learned from the world of feature development. I chose to present my
          project in the most realistic way possible, my project is actually an
          online store. It may sound like a relatively banal project, but it is
          important for me to explain that everything is done with deep thought
          and proper planning.
        </span>
        <span>
          My project is actually a full stack project that is based on the
          server side on an API that interfaces with a database and with the
          help of Http requests returns objects that are received on the client
          side and displayed in a store that built using React.
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-1 flex-column">
        <h4>Server side</h4>
        <span>
          The server side of my project is built using an API that interfaces
          with a database and uploads initial data to it using Migrations. I
          have Controllers for each object to which simple CRUD operations can
          be performed and for certain objects more complex operations if
          necessary. For example, in the Controller of the Login object, a
          validation operation must be performed and a Token returned to the
          user with which he entered the site and thus his details can be
          identified. The objects are linked with the help of keys, for example
          there is an Order object and there is a User object, in order to be
          able to link an order to a specific customer, a userID is added to the
          Order and thus it is possible to link them (an operation called JOIN).
          Another thing that is important to me on the server side is uploading
          a Product object, we know that this type of object requires an image,
          so what I chose to do with forward thinking is to store the image
          itself in the API and you the address in a database, thus reading an
          object will be more efficient and in addition it saves weight in from
          a database.
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-1 flex-column">
        <h4>Client side</h4>
        <span>
          Client side is the visible part and more complicated in terms of
          writing a test that you can use one call from the API in several
          different and diverse components.
        </span>
        <h5>Components</h5>
        <span>
          Login, this component requires a username and password and thus sends
          the same parameters to the API that checks if such a user exists in
          the database, if so the user receives a token, his details are saved
          in local storage, and he is given full access to the site, for example
          placing orders and if he manages access to the back office area , if
          the user is not registered, there is an option of registration (Sign
          Up), which actually makes a POST request to the API and creates a
          user.
        </span>
        <span>
          Header, I created a Context that calls the categories once unless
          there is a change in the categories in order not to cause a load on
          the server and with the thought that in most cases when a normal user
          browses the site the categories will not change, in the Header there
          are links that actually take us to the page we want to reach, it is
          found throughout the site at the top of the page . In this area you
          can find the login component and the shopping basket.
        </span>
        <span>
          Cart is a component that contains an array located in local storage to
          which products are added using a button located on the product tab and
          through which the user can place an order on the website, the products
          are passed through the body of the request together with the user's
          information and with this an order is created with items associated
          with that user.
        </span>
        <span>
          Search Bar, this is a component found on the Products page, the user
          passes a search word and the component filters the products and with
          the help of this word shows the user the products according to the
          search word he entered.
        </span>
        <span>
          Side Panel, is a component displayed in the Back Office area and with
          the help of the display variable, it is actually a navigation menu for
          this area.
        </span>
        <span>
          Footer, this component is displayed at the bottom of the entire site
          and contains links to me on all social media.
        </span>
        <h5>Pages</h5>
        <span>
          Back office, where those who need to come and this area is protected
          using a component called Protected whose function is to check the
          token of that user and if it is found that he is an administrator he
          is given access, only those who are defined as administrators can give
          this permission to other users, in this area I implemented all the
          actions that I actually built in the API. In this area there are
          various options for example to add products, edit products, give
          permissions, add categories, etc. In this area, the operations are
          done directly in front of the API in order to give the most recent
          information.
        </span>
        <span>
          Products, this page is the more interesting area, this area is a
          single page that basically shows us all the finds in a segmented way,
          it activates a Context that fetches all the products from the API and
          according to the link we clicked on in the header, it knows which
          category of products to display, it receives the Category ID through
          The link and thus the mapping of the products is created, the mapping
          changes as soon as a category changes and thus it looks like several
          separate pages. On this page there are various options such as, to
          sort the products, a search bar that looks for products from the
          category we are in and in each product tab there is an option to add
          to the shopping basket and reach a product page.
        </span>
        <span>
          Product Details, this is a page that you reach by clicking on a button
          on the product tab and it shows in detail the details about that
          product by calling the product from the API according to the Product
          ID.
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-1 flex-column">
        <h4>In conclusion</h4>
        <span>
          The site was built with deep thought and a lot of investment, whether
          it is in the design or whether it is in the cleanliness of the code,
          correct and clear writing. I would be happy to hear good and less good
          reviews to appreciated the investment and more than that for
          improvement and learning. Thank you.
        </span>
      </div>
    </div>
  );
};

export default Home;
