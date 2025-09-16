import { Types } from "connectkit";
import { generateColorFromAddress } from "@/lib/utils";

const ENSAvatar = ({
  address,
  ensImage,
  ensName,
  size,
  radius,
}: Types.CustomAvatarProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
        background: generateColorFromAddress(address),
      }}
    >
      {ensImage && (
        <img
          src={ensImage}
          alt={ensName ?? address}
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default ENSAvatar;
