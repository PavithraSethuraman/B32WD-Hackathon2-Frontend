import { useState, useEffect, useContext } from "react";
import Context from "../context";
import axios from "axios";
function Card({ match }) {
  const context = useContext(Context);
  const [card, setCard] = useState([]);

  //To  Fetch data
  let getsearch = async () => {
    if (context.state.length !== 0 || match.path === "/:id") {
      if (match.path === "/:id") {
        const { data } = await axios.get(
          `https://b32-hackathon2-backend-webscra.herokuapp.com/products/${match.params.id}`
        );
        console.log("search");
        console.log(data);
        setCard(data);
      } else {
        console.log("home");
        pagination(context.state);
      }
    } else {
      const { data } = await axios.get(
        "https://b32-hackathon2-backend-webscra.herokuapp.com/products"
      );

      pagination(data);
    }
  };
  console.log(getsearch())
  useEffect(() => {
    getsearch();
  }, []);

  //To Change States --> when params change
  useEffect(() => {
    getsearch();
  }, [match.params.id]);

  //---> Pagination<---//

  let allvalues = [];

  let pagination = (data) => {
    allvalues = [...data];
    console.log(allvalues);

    previousPage();
  };

  let nextPage = () => {
    if (allvalues.length === 0) {
      allvalues = [...context.state];
      console.log(allvalues);
    }
    let temp = [];

    let startindex = context.pagenumber;
    let endindex = context.pagenumber + 10;
    for (let i = startindex; i < endindex; i++) {
      temp.push(allvalues[i]);
    }
    setCard(temp);
    context.pagenumber = endindex;
    if (context.pagenumber >= allvalues.length) {
      context.pagenumber = allvalues.length - 10;
    }
  };
  let previousPage = () => {
    if (allvalues.length === 0) {
      allvalues = [...context.state];
    }
    let temp = [];

    let endindex = context.pagenumber;
    let startindex = context.pagenumber - 10;
    for (let i = startindex; i < endindex; i++) {
      temp.push(allvalues[i]);
    }
    setCard(temp);

    context.pagenumber = startindex;

    if (context.pagenumber <= 0) {
      context.pagenumber = 10;
    }
  };

  return (
    <div>
      <div className="container-fluid  cardgrid">
        {card.map((x) => {
          return (
            <div className="card" key={x._id}>
              <img
                className="card-img-top cardimg"
                alt="Mobile"
                style={{ width: "100%" }}
                src={x.image}
              ></img>
              <div className="card-body">
                <div className="logo" ><img className="logoimg" style={{ width: "100%" }} src={x.logo} alt="logo"/></div>
                <p className="title">{x.title}</p>
                <p className="rating">Rating:{x.rating}</p>
                <p className="finalprice">Offer Price:{x.offerprice} <span className="price">price{x.price}</span></p>
                
              </div>
            </div>
          );
        })}
      </div>
      {match.params.id ? (
        <>
        </>
      ) : (
        <div className="pagi">
          <button
            type="button"
            className="btn butt"
            onClick={nextPage}
          >
            Next
          </button>
          <button
            type="button"
            className="btn butt"
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn butt"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default Card;
