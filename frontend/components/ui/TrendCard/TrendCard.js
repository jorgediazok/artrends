import CardDesktop from "./CardDesktop/CardDesktop";
import CardMobile from "./CardMobile/CardMobile";

const TrendCard = ({ title, link, amount, position }) => {
  console.log(amount);
  return (
    <CardDesktop
      title={title}
      link={link}
      amount={amount}
      position={position}
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
