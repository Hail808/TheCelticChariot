const Home = () => {
  return (
    <div className="home-container">
      {/*<h1>Homepage</h1>*/}

      {/*Featured Items Text*/}
      <div className="label-featured-items">
        <p>Featured Items</p>
      </div>

      <div className="featured-cards">
        <div className="featured-item-box">
          Featured Item 1
        </div>

        <div className="featured-item-box">
          Featured Item 2
        </div>
      </div>

      {/*Categories Text Itself*/}
      <div className="label-categories">
        <p>Categories</p>
      </div>

      <div className="categories-card">

        <div className="categories-grouping">
          <div className="categories-group-label">
            <p>Necklaces</p>
          </div>
          <div className="category-photo">
            <p>Necklace Photo</p>
          </div>
        </div>

        <div className="categories-grouping">
          <div className="categories-group-label">
            <p>Earrings</p>
          </div>
          <div className="category-photo">
            <p>Earrings Photo</p>
          </div>
        </div>

        <div className="categories-grouping">
        <div className="categories-group-label">
            <p>DIY Beads</p>
          </div>
          <div className="category-photo">
            <p>DIY Beads Photo</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;