import Wrapper from "../assets/wrappers/StatItem.js";

export default function StatItems({ title, icon, count, color, bcg }) {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <h3 className="title">{title}</h3>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="count">{count}</h5>
    </Wrapper>
  );
}
