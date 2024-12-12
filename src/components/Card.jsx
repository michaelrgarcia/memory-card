function Card({ imgUrl, clickHandler }) {
  return (
    <button
      type="button"
      style={{ backgroundImage: `url(${imgUrl})` }}
      onClick={clickHandler}
    ></button>
  );
}

export default Card;
