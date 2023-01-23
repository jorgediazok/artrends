import CardDesktop from "./CardDesktop/CardDesktop";
import CardMobile from "./CardMobile/CardMobile";

const TrendCard = ({
  title,
  link,
  amount,
  position,
  direction,
  streak,
  type,
  channel,
  channelLink,
  publisher,
  height,
  author,
}) => {
  return (
    <>
      <CardDesktop
        title={title}
        link={link}
        amount={amount}
        position={position}
        direction={direction}
        streak={streak}
        channel={channel}
        channelLink={channelLink}
        author={author}
        publisher={publisher}
        height={height}
        type={type}
      />
      <CardMobile
        title={title}
        link={link}
        amount={amount}
        position={position}
        direction={direction}
        streak={streak}
        channel={channel}
        channelLink={channelLink}
        author={author}
        publisher={publisher}
        height={height}
        type={type}
      />
    </>
  );
};

export default TrendCard;
