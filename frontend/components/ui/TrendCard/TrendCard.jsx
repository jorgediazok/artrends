import CardDesktop from "./CardDesktop/CardDesktop";
import CardMobile from "./CardMobile/CardMobile";

const TrendCard = ({
  title,
  link,
  amount,
  position,
  direction,
  streak,
  referencia,
}) => {
  return (
    <CardDesktop
      title={title}
      link={link}
      amount={amount}
      position={position}
      direction={direction}
      streak={streak}
      referencia={referencia}
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
