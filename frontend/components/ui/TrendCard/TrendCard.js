import CardDesktop from "./CardDesktop/CardDesktop";
import CardMobile from "./CardMobile/CardMobile";

const TrendCard = ({ title, link, amount, position, direction, streak }) => {
  return (
    <CardDesktop
      title={title}
      link={link}
      amount={amount}
      position={position}
      direction={direction}
      streak={streak}
    />
  );
};

export default TrendCard;

{
  /* <CardContainer>
  <CardMobile >
<TresBotoncitos/>
<PosicionYFlechita/>
</CardMobile>
  <CardDesktop >
<PosicionYFlechita/>
<Share />
</CardContainer> */
}
