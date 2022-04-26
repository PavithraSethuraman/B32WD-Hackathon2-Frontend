import { Link } from "react-router-dom";
import { useState } from "react";
function Nav() {
  const [path, setPath] = useState("");

  let handleChange = (value) => {
    setPath(value);
    console.log(value);
  };

  return (
    <>
      <div className="navbar navbar-expand-md navb">
        <span className="navbar-brand navba ">Web Scarping</span>
        <Link className="nav-link homelink" to="/">
          Home
        </Link>
      </div>
      <div className="container-fluid">
        <form className="form-inline">
          <div className="input-group inpdiv ">
            <input
              type="text"
              className="form-control inp"
              placeholder="Please Enter Brand "
              id="demo"
              name="search"
              onChange={(event) => {
                handleChange(event.target.value);
              }}
            />
            <div className="input-group-append">
              <Link className=" btn but" to={`/${path}`}>
                <i className="fas fa-search"></i>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Nav;
