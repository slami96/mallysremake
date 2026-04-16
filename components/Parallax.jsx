import Img from './Img';

export default function Parallax() {
  return (
    <div className="parallax">
      <Img
        src="/images/site/landscape_broumovsko.jpg"
        alt="Broumovsko landscape"
        className="parallax__img"
      />
    </div>
  );
}
